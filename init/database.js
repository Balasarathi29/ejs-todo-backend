const mongoose = require("mongoose");



const databaseConnection = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed", err.message);
        process.exit(1)
    }
}

module.exports = databaseConnection;