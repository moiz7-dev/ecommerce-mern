const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");

// only admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

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
    
    const apiFeatures = new ApiFeatures(Product, req.query).search().filter().pagination(resultsPerPage);
    
    const products = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        products,
        productsCount
    })
})

// only admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
        
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if(!product){

        return next(new ErrorHandler('Product not found', 400));
    }

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