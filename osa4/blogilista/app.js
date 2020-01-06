/*EXPRESS*/
const express = require('express')
/*ENV*/
const config = require('./utils/config')
/*MIDLEWARE*/
const bodyParser = require('body-parser')
const cors = require('cors')
/*CONTROLLER*/
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app