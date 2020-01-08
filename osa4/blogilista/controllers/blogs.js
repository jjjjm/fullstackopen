const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const verifiedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !verifiedToken.id) {
            return response.status(401).json({error: 'missing or invalid token'})
        }

        const user = await User.findById(verifiedToken.id)

        const blog = new Blog({ ...request.body, user: user._id.toString() })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const verifiedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(verifiedToken.id)
        const blog = await Blog.findById(request.params.id)
        if (!request.token || !verifiedToken.id || user._id.toString() !== blog.user.toString()) {
            return response.status(401).json({ error: 'missing or invalid token' })
        }
        user.blogs = user.blogs.filter(blogId => blogId !== blog._id.toString())
        await Blog.findByIdAndRemove(request.params.id)
        await user.save()
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const updatedBlog = { ...request.body }
        const returned = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        response.status(200).json(returned)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter