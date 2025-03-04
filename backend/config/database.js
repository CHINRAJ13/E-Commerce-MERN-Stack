const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
    .then((con) => {
        console.log(`MongoDB has connected to the host: ${con.connection.host}`)
    }).catch((error)=> {
        console.log(error);
    });
}

module.exports = connectDatabase;