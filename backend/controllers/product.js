const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary");

// only admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product 
    })
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const productsCount = await Product.countDocuments();
    
    const resultsPerPage = req.query?.limit || 8;
    
    const apiFeatures = new ApiFeatures(Product, req.query).search().filter()
    
    let products = await apiFeatures.query;

    let filteredProductsCount = products.length;

    apiFeatures.pagination(resultsPerPage);
    
    products = await apiFeatures.query.clone();
    
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultsPerPage,
        filteredProductsCount
    })
})

// get all products (ADMIN)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        products,
    })
})

// only admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
        
    let product = await Product.findById(req.params.id);

    if(!product){

        return next(new ErrorHandler('Product not found', 400));
    }

    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }else {
        images = req.body.images;
    }

    if(images){

        // Deleting images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    
        const imagesLink = [];
    
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            });
    
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
        }
    
        req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    res.status(200).json({
        success: true,
        product
    })

})

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findByIdAndDelete(req.body.id);

    if(!product){

        return next(new ErrorHandler('Product not found', 400));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){

        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findByIdAndUpdate(productId);

    if(!product){
        return next(new ErrorHandler(`Product doesn\'t exists on given ID: ${productId}`));
    }

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id);

    if(isReviewed){
        product.reviews.map(review => {
            if(review.user.toString() === req.user.id){
                review.rating = Number(rating);
                review.comment = comment
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    
    let total = 0;
    product.reviews.map(review => {
        total += review.rating;
    })
    
    product.ratings = total / product.reviews.length; 

    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });

});

//get all reviews of single product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler(`Product not found`, 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete a review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler(`Product not found`, 404));
    }

    const reviews = product.reviews.filter(rev => rev.id !== req.query.id);

    let total = 0;
    reviews.map(review => {
        total += review.rating;
    })

    product.ratings = total / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {new: true, runValidators: true, useFindAndModify: false})

    res.status(200).json({
        success: true,
    })
})