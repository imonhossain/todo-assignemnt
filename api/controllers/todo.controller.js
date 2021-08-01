const Todo = require('./../models/Todo.model');

const todoController = {
  getList: async function (req, res) {
    try {
      const todo = await Todo.find();
      return res.send({
        'status': true,
        'message': 'All todo List',
        'data': todo
      })
    } catch (error) {
      return res.status(500).send({
        'status': false,
        'message': error.message
      })
    }
  },
  add: async function (req, res) {
    const { name, comments, vote, showComment } = req.body
    if (!name) {
      return res.status(400).send({
        status: false,
        "message": "name must not be empty"
      })
    }

    try {
      const newTodo = new Todo({ name, comments, vote, showComment })
      const saveData = await newTodo.save({ validateBeforeSave: true })
      return res.send({
        'status': true,
        'message': `${name} has successfully added`,
        'todo': saveData
      })
    } catch (err) {
      return res.status(400).send({ 'status': false, 'message': err.message })
    }
  },
  update: async function (req, res) {
    try {
      const item = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, runValidators: true,
      })
      if (!item) {
        return res.status(404).send({
          'status': false,
          'message': 'Item not found'
        })
      }
      return res.send({ 'status': true, 'message': 'Update succsess' })

    } catch (err) {
      return res.status(400).send({
        'status': false,
        'message': err.message
      })
    }
  },
  getTodo: async function (req, res) {
    const id = req.params.id;
    try {
      const item = await Todo.findById(id);
      if (!item) {
        return res.status(404).send({
          status: false, message: 'item not found'
        })
      }
      return res.status(200).send({
        status: true,
        message: 'success',
        item
      })
    } catch (err) {
      return res.status(400).send({
        status: false, message: err
      })
    }
  },
  delete: async function (req, res) {
    try {
      const item = await Todo.findByIdAndDelete(req.params.id)
      if (!item) {
        return res.status(404).send({
          status: false, message: 'item not found'
        })
      }
      return res.send({
        'status': true,
        'message': 'Delete item success'
      })
    } catch (error) {
      return res.status(400).send({
        'status': 'error',
        'message': err.message
      })
    }
  },

}

module.exports = todoController;