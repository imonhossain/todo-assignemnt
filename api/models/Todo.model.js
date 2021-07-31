const mongoose = require('mongoose')
const Shema = mongoose.Schema

//monggodb schema
const todoShcema = new Shema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    date: {
        type: String,
        required: true,
    },
    showComment: {
        type: Boolean,
        required: true,
    },
    comments: [{
        type: String
    }],
    vote: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

// add to mongoose model
const Todo = mongoose.model('Todo', todoShcema)

module.exports = Todo