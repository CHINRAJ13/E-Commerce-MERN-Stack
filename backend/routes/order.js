var express = require('express');
var router = express.Router();
const Order = require('./Models/orderSchema');
const Product = require('./Models/productSchema');
const { isAuthenticatedUser, authorizedUser } = require('../middleware/authenticate');


// Create new order - /order/new
router.post('/new', isAuthenticatedUser, async function (req, res, next) {
    try {
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get single order
router.get('/:id', isAuthenticatedUser, async function (req, res, next) {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if(!order){
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(201).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Get loggedin user's orders
router.get('/myorders/:id', isAuthenticatedUser, async function (req, res, next) {
    try {
        const orders = await Order.find({user: req.user.id});


        res.status(201).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Admin = Get all orders
router.get('/allorders/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
    try {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach(order => {
            totalAmount += order.totalPrice;
        })

        res.status(201).json({
            success: true,
            totalAmount,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Admin = Update order and order Status - 
router.put('/update/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
    try {
        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({
                success: false,
                error: 'Order has not found'
            });
        }

        if(order.orderStatus == 'Delivered'){
            return res.status(400).json({
                error: 'Order has already been delivered'
            });
        }

        // update the product stock of each product
        order.orderItems.forEach( async orderItem => {
            await updateStock( orderItem.product, orderItem.quantity );
        })

        order.orderStatus = req.body.orderStatus;
        order.deliveredAt = Date.now();

        await order.save({validateBeforeSave: false});

        res.status(200).json({
            success: true,
            message: 'Order status has been updated',
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const updateStock = async ( productId, quantity ) => {
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false});
}

// Admin = Delete the order
router.delete('/delete/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next){
    try {
        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Order has been deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;