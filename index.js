const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const databaseConnection = require('./init/database');

const app = express();

databaseConnection()

const Schema = mongoose.Schema({
    title : {type:String, required:true},
    desc : {type:String, required:true},
},{timestamps:true});

const Todo = mongoose.model('Todo',Schema);

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res,next)=>{
    try{
        res.render("index")
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.get("/add-todo",(req,res,next)=>{
    try{
        res.render("create")
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.get("/delete-todo",(req,res,next)=>{
    try{
        res.render("delete")
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.get("/update-todo",(req,res,next)=>{
    try{
        res.render("update")
    }catch(err){
        res.status(500).send({message:err.message});
    }
})



app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})