const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/todoApp";

const databaseConnection = mongoose.connect(url).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB:", err.message);
});

module.exports = databaseConnection;