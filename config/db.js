const mongoose = require('mongoose');

require('dotenv').config({path: 'env.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Database connect...')
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB;