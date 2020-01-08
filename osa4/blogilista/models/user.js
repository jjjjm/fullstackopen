const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')

const url = config.MONGODB_URL

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true, minLength: 5 },
    name: {type: String},
    passwordhash: {type: String},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordhash
    }
})


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model('User', userSchema)

