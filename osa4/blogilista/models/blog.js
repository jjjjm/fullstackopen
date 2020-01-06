const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URL

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

mongoose.connect(url, { useNewUrlParser: true })

module.exports = mongoose.model('Blog', blogSchema)

