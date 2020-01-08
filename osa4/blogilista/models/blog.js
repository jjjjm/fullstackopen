const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URL

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model('Blog', blogSchema)

