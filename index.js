const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const databaseConnection = require('./init/database');
const bodyParser = require('body-parser');
const moment = require('moment');
const { title } = require('process');

const app = express();
databaseConnection();
const Schema = mongoose.Schema({
    title : {type:String, required:true},
    desc : {type:String, required:true},
},{timestamps:true});

const Todo = mongoose.model('Todo',Schema);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',async(req,res,next)=>{
    try{
        const todos = await Todo.find({}).sort({createdAt:-1});
        res.locals.moment = moment;
        res.render("index",{title:"Todo App", todos});
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.get("/add-todo",(req,res,next)=>{
    try{
        res.render("create" , {title:"Add Todo"})
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.get("/delete-todo",(req,res,next)=>{
    try{
        res.render("delete",{title:"Delete Todo"})
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.get("/update-todo",(req,res,next)=>{
    try{
        res.render("update" , {title:"Update Todo"})
    }catch(err){
        res.status(500).send({message:err.message});
    }
})

app.post('/add-todo',async(req,res,next)=>{
    try{
        const {title,desc} = req.body
        if(!title || !desc){
            res.status(400).send({message:"Title and Description are required"});
            return;
        }
        const todo = new Todo({title,desc});
        await todo.save();
        res.redirect('/');
    }catch(err){
        res.status(500).send({message:err.message});
    }
})
app.post("/update-todo/:id",async (req,res,next)=>{
    try{
        const {id} = req.params
        const todos = await Todo.findById(id)
        res.render("update" , {title:"Update Todo"},todos)
    }catch(err){
        res.status(500).send({message:err.message});
    }
})



app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})