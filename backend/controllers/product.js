const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");

// only admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product 
    })
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const apiFeatures = new ApiFeatures(Product, req.query).search()

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products
    })
})

// only admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
        
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if(!product){
        // return res.status(400).json({
        //     success: false,
        //     message: "Product not found"
        // })
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
        // return res.status(400).json({
        //     success: false,
        //     message: 'Product not found'
        // })
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
        // return res.status(400).json({
        //     success: false,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler('Product not found', 400));
    }

    res.status(200).json({
        success: true,
        product
    })
})
