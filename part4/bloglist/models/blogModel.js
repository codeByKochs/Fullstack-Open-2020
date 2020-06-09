const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author:{
        type: String,
        minlength: 3
    },
    title:{
        type: String,
        minlength: 5
    },
    url:{
        type: String,
        required: true,
    },
    votes:{
        type: Number,
        min: 0,
    }
})

module.exports = mongoose.model('Blog', blogSchema)