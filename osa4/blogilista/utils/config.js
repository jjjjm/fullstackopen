require('dotenv').config()

const executionEnv = () => {
    switch (process.env.NODE_ENV) {
        case 'deployment': return process.env.MONGODB_URI
        case 'test': return process.env.TEST_MONDODB_URI
        default : console.log('NODE_ENV malformatted')
        process.exit(1)
    }
}

let PORT = process.env.PORT
let MONGODB_URL = executionEnv()



module.exports = {
    PORT,
    MONGODB_URL
}