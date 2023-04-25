const mongoose = require("mongoose");
const dev = require(".");

const connnectDB = async() => {
    try {
        await mongoose.connect(dev.db.mongodbUrl)
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = connnectDB;