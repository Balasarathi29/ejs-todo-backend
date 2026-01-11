const Todo = require("../models/TodoSchema");
const moment = require("moment");

const homeController = async(req,res,next)=>{
    try{
        const todos = await Todo.find({}).sort({createdAt:-1});
        res.locals.moment = moment;
        res.render("index",{title:"Todo App", todos});
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

const addController = (req,res,next)=>{
    try{
        res.render("create" , {title:"Add Todo"})
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

const deleteController = (req,res,next)=>{
    try{
        const {id} = req.query;
        res.render("delete",{title:"Delete Todo", id})
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

const updateController = async (req,res,next)=>{
    try{
        const {id} = req.query;
        const todo = await Todo.findById(id);
        res.render("update" , {title:"Update Todo", todo})
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

const addPostController = async(req,res,next)=>{
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
}

const updatePostController = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const {title,desc} = req.body;
        const todo = await Todo.findById(id);
        if(!todo){
            res.status(404).send({message:"Todo not found"});
        }
        todo.title = title;
        todo.desc = desc;

        await todo.save();
        res.redirect('/');
    }catch(err){
        res.status(500).send({message:err.message});
    }
}

const deleteTodoController = async (req,res,next)=>{
    try{
        const {id,confirm} = req.query;
        if(confirm === 'yes'){
            await Todo.findByIdAndDelete(id);
        }
        res.redirect('/');
    }catch(err){
        res.status(500).send({message:err.message});
    }
}


module.exports = {homeController, addController, deleteController, updateController, addPostController, updatePostController, deleteTodoController};