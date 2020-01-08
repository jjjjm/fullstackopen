const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findOne({username: body.username})

    const correctPassword = user
    ? await bcrypt.compare(body.password, user.passwordhash)
    : false

    if (!(user && correctPassword)) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const userTokenConstructor = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userTokenConstructor, process.env.SECRET)

    response
    .status(200)
    .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter