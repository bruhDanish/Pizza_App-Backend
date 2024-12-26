const mongoose = require("mongoose");
const serverConfig = require("./server.config.js");

async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Unable to connect to DB", error);
        
    }
}

module.exports = connectDB;