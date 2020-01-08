const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (!body.password || body.password.length < 3) {
            return response.status(400).json({ error: 'Password must be defined with atleast 3 characters' })
        }
        const passwordhash = await bcrypt.hash(body.password, 10)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordhash
        })

        const newUser = await user.save()

        response.json(newUser)
    } catch (expection) {
        next(expection)
    }
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})

module.exports = userRouter