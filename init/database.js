const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/todoApp";

const databaseConnection = async ()=>{
    try{
        await mongoose.connect(url)
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed", err.message);
        process.exit(1)
    }
}

module.exports = databaseConnection;