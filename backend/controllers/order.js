const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        order
    })
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler('Order not found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    })
});

// get loggedin user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        orders
    })
});

// get all orders admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

});

// update order status (admin)
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    if (!order) {
        return next(new ErrorHandler('Order not found with this ID', 404));
    }
    
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this Order', 400))
    };

    orders.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;

    if(order.orderStatus === 'Delivered'){
        order.deliveredAt = Date.now();
    }

    await Order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
})

async function updateStock (id, quantity) {
    const product = await Product.findById(id);

    product.Stock = product.Stock - quantity;

    await product.save({validateBeforeSave: false});
};

// delete order (admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('Order not found with this ID', 404));
    }

    await Order.remove();

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

});