const bodyParser = require("body-parser");
const databaseConnection = require("./init/database");
const path = require("path");
const express = require("express");
const todoRoutes = require("./routes/todo");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

databaseConnection();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/',todoRoutes);

module.exports = app;