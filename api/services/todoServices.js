const Todo = require("../models/Todo.model");


fetchAllTodos = async function (cb) {
  try {
    const todo = await Todo.find();
    console.log("todo", todo);
    const obj = {
      'status': true,
      'message': 'All todo List',
      'data': todo
    }
    cb(null, obj);
  } catch (error) {
    cb(null, {
      'status': false,
      'message': err.message
    });
  }
};


exports.TodoService = { fetchAllTodos };