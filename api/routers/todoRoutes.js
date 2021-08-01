const router = require('express').Router()
const todoController = require('../controllers/todo.controller');
//get all todo list
router.get('/', async (req, res) => {
    await todoController.getList(req, res);
})

//post todo item
router.post('/add', async (req, res) => {
    await todoController.add(req, res);
})

//update todo item by id
router.put('/update/:id', async (req, res) => {
    await todoController.update(req, res);

})

router.get('/item/:id', async (req, res) => {
    await todoController.getTodo(req, res);
})

//delete todo ite by id
router.delete('/delete/:id', async (req, res) => {
    await todoController.delete(req, res);
})

module.exports = router