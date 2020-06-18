const userRouter = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const { response } = require('express');

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map((user) => user.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
    
    const user = new User({
        userName: request.body.userName,
        name: request.body.name,
        passwordHash,
    })

    const savedUser = await user.save();
    response.json(savedUser)
})

module.exports = userRouter
