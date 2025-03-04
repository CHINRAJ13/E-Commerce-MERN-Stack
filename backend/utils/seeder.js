var products = require('../data/products.json');
var Product = require('../routes/Models/productSchema');
var dotenv = require('dotenv');
const connectDatabase = require('../config/database');

dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('All Products has been deleted');
        
        await Product.insertMany(products);
        console.log('All new Products are inserted');

    } catch (error) {
        console.log('Seeder Error: ', error.message);
    }
    process.exit();
}

seedProducts();