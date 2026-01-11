const express = require('express');
const Todo = require('../models/TodoSchema');
const moment = require('moment');
const todo = require('../controller/todoController');
const router = express.Router();

router.get('/',todo.homeController)
router.get("/add-todo",todo.addController)
router.get("/delete-todo",todo.deleteController)
router.get("/update-todo",todo.updateController)
router.post('/add-todo',todo.addPostController)
router.post('/update-todo/:id',todo.updatePostController)
router.get('/confirm-delete',todo.deleteTodoController)

module.exports = router;