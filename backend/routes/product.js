var express = require('express');
var router = express.Router();
var Product = require('./Models/productSchema');
var APIFeatures = require('../utils/apiFeatures');
var {isAuthenticatedUser, authorizedUser} = require('../middleware/authenticate');
const multer = require('multer');
const path = require('path');

const upload = multer({storage: multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname,'..','uploads/products'))
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
}) })

let BASE_URL = process.env.BACKEND_URL;
if(process.env.NODE_ENV === "production") {
  BASE_URL = `${req.protocol}://${req.get('host')}`
}

// Get All products - /product
router.get('/',  async function (req, res, next) {
    try {
        const resPerPage = 3;
        const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);

    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter();
    }

    const filteredProductsCount = await buildQuery().query.countDocuments({});
    
    const totalProductsCount = await Product.countDocuments({});

    let productsCount = totalProductsCount;

    if( filteredProductsCount !== totalProductsCount){
        productsCount = filteredProductsCount;
    }
    
    const products = await buildQuery().paginate(resPerPage).query;

    //   return res.status(400).json({
    //     error: 'Unable to send product'
    //   })

      res.status(201).json({
          success: true,
          message: 'All products are got successfully',
          count: totalProductsCount,
          resPerPage,
          products
      });
    } catch (error) {
     res.status(500).json({
         success: false,
         error: error.message
     });
    }
 });


// Get Single product - /product/:id
router.get('/:id', async function (req, res, next) {
   try {
     const product = await Product.findById(req.params.id).populate('reviews.user','name email');

     if(!product){
        res.status(404).json({
            success: false,
            error: 'Product not found'
        });
     }

     res.status(201).json({
         success: true,
         message: 'Single product has got successfully',
         product
     });
   } catch (error) {
    res.status(500).json({
        success: false,
        error: error.message
    });
   }
});


// Create a product - /product
router.post('/new', isAuthenticatedUser, authorizedUser('admin'), upload.array('images'), async function (req, res, next) {
    try {
        let images = [];

        if(req.files.length > 0) {
            req.files.forEach(file => {
                let url =`${BASE_URL}/uploads/products/${file.originalname}`;
                images.push({image: url})
            })
        }

        req.body.images = images;

        req.body.user = req.user.id;
        const product = await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
});


// Update a product - /product/:id
router.put('/:id', isAuthenticatedUser, authorizedUser('admin'), upload.array('images'), async function (req, res, next) {
    try {
        let product = await Product.findById(req.params.id);
    
        if(!product){
            res.status(404).json({
                success: false,
                error: 'Product not found'
            });
         }

        //  uploading images
         let images = [];

         if(req.body.imagesCleared === 'false'){
            images = product.images;
         }   

         if(req.files.length > 0) {
             req.files.forEach(file => {
                 let url =`${BASE_URL}/uploads/products/${file.originalname}`;
                 images.push({image: url})
             })
         }
 
         req.body.images = images;
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Delete a product - /product/:id
router.delete('/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
    try {
        let product = await Product.findById(req.params.id);
    
        if(!product){
            res.status(404).json({
                success: false,
                error: 'Product not found'
            });
         }
        
         await Product.deleteOne({ _id: req.params.id });
    
        res.status(201).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Create product reviews
router.put('/reviews/:id', isAuthenticatedUser, async function (req, res, next) {
    try {
        const { productId, rating, comment } = req.body;

        const review = {
            user: req.user.id,
            rating,
            comment
        }

        if(!productId){
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            })
        }

        const product = await Product.findById(productId);
        // finding the user already has reviews
        const isReviewed = product.reviews.find( review => {
            return review.user.toString() == req.user.id.toString()
        })

        if(isReviewed){
            // updating review
            product.reviews.forEach(review => {
                if(review.user.toString() == req.user.id.toString()){
                    review.comment = comment;
                    review.rating = rating;
                }
            })
        } else {
            // creating the review
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // finding the average of rating
        product.ratings = product.reviews.reduce((acc, review) => {
            return review.rating + acc;
        }, 0) / product.reviews.length;
        isNaN(product.ratings) ? 0 : product.ratings;

        await product.save({validateBeforeSave: false});

        res.status(200).json({
            success: true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Admin : Get reviews
router.get('/reviews/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next){
    try {
        // const product = await Product.findById(req.query.id);  
        const product = await Product.findById(req.params.id).populate('reviews.user','name email'); 

        res.status(201).json({
            success: true,
            reviews: product.reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Admin : Delete Reviews
router.delete('/reviews/:id', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next){
    try {
        // const product = await Product.findById(req.query.productId);  
        const product = await Product.findById(req.params.id); 
        console.log(req.query.id);
        

        // filtering the product reviews which does not match the deleting reviews
        const reviews = product.reviews.filter(review => {
            return review._id.toString() !== req.query.id.toString()
        })

        // reassigning the filtered reviews to the product
        const numOfReviews = reviews.length;

        // average of ratings
        let ratings = product.reviews.reduce((acc, review) => {
            return review.rating + acc;
        }, 0) / reviews.length;

        ratings = isNaN(ratings) ? 0 : ratings;

        // save the product reviews
        await Product.findByIdAndUpdate(req.params.id, {
            reviews,
            numOfReviews,
            ratings
        });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Admin get All products
router.get('/admin/products', isAuthenticatedUser, authorizedUser('admin'), async function (req, res, next) {
    try {
        const products = await Product.find();

        res.status(201).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})


module.exports = router;