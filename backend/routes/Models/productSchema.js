var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true,
        maxLength:[100, "Product name cannot exists more than 100 characters"],
    },
    price: {
        type: Number,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"],
    },
    ratings: {
        type: String,
        default: 0
    },
    images:[
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please select the product category"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Headphones',
                'Accessories'
            ],
            message: 'Please select a valid category'
        }
    },
    seller: {
        type: String,
        required: [true, "Please enter the product seller"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stocks"],
        maxLength: [20, "Product stock cannot exists 20"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: String,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const product = mongoose.model('Product', productSchema);

module.exports = product;