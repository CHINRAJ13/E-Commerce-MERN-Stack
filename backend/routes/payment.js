var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY)
var { isAuthenticatedUser } = require('../middleware/authenticate')


// Payment Process
router.post('/process', isAuthenticatedUser, async function (req, res, next) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            description: "Test Payment",
            metadata: {integration_check: "accept payment"},
            shipping: req.body.shipping
        })

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

// send stripe api
router.get('/stripeapi', isAuthenticatedUser, async function (req, res, next) {
    try {

        res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

module.exports = router;