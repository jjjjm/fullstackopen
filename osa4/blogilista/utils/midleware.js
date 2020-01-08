const errorHandler = (error, request, response, next) => {
    switch (error.name) {
        case 'ValidationError': return response.status(400).json({ error: error.message })
        case 'CastError': if (error.kind === 'ObjectId') {
            return response.status(400).json({ error: 'malformatted id' })
        } else {
            next(error)
        }
        case 'JsonWebTokenError': return response.status(401).json({ error: 'invalid token' })
        default: next(error)
    }
}

const headerBearerToken = (request, response, next) => {
    const authorization = request.get('authorization')
    request.token = (authorization && authorization.toUpperCase().startsWith('BEARER '))
        ? authorization.substring(7)
        : null
    next()
}

module.exports = {
    errorHandler,
    headerBearerToken
}