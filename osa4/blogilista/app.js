/*EXPRESS*/
const express = require('express')
/*ENV*/
const config = require('./utils/config')
/*MIDLEWARE*/
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/midleware')
/*CONTROLLER*/
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.headerBearerToken)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app