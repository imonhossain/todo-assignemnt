const router = require('express').Router()
const Todo = require('../models/Todo.model')
//get all todo list
router.get('/', async (req, res) => {
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
            'message': err.message
        })
    }
})

//post todo item
router.post('/add', async (req, res) => {
    const { name, date, comments, vote, showComment } = req.body
    console.log(req.body);
    if (!name) {
        return res.status(400).send({
            status: false,
            "message": "name must not be empty"
        })
    }

    try {
        const newTodo = new Todo({ name, date, comments, vote, showComment })
        console.log("newTodo", newTodo);
        await newTodo.save({ validateBeforeSave: true })
        return res.send({
            'status': true,
            'message': `${name} has successfully added`
        })
    } catch (err) {
        console.log("err", err);
        return res.status(400).send({ 'status': false, 'message': err.message })
    }
})

//update todo item by id
router.put('/update/:id', async (req, res) => {

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
})

router.get('/item/:id', async (req, res) => {
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
})

//delete todo ite by id
router.delete('/delete/:id', async (req, res) => {
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
})

module.exports = router