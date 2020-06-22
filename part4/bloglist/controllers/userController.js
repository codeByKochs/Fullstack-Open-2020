const userRouter = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {author: 1, title: 1, url: 1, votes: 1})
    response.json(users.map((user) => user.toJSON()))
})

userRouter.post('/', async (request, response) => {
    // check for correct userName length
    if (request.body.userName.length < 3){
        response.status(400).json({error: 'userName must be at least three characters long'})
    }

    // check for correct password length
    else if (request.body.password.length < 3){
        response.status(400).json({error: 'password must be at least three characters long'})
    } else {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
    
        const user = new User({
            userName: request.body.userName,
            name: request.body.name,
            passwordHash,
        })
    
        const savedUser = await user.save();
        response.json(savedUser)
    }
})

module.exports = userRouter
