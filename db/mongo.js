require("dotenv").config();

const mongoose = require('mongoose');

const clientOptions = {
  //  useNewUrlParser   : true,
  //  dbName            : ''
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}