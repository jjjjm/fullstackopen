const supertest = require('supertest')
const mongoose = require('mongoose')
const testData = require('./blog_testdata')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/* REMOVE ALL AND SET ALL TEST DATA TO DB */
beforeEach(async () => {
    await Blog.remove({})
    const testBlogs = testData.blogs.map(blog => new Blog(blog))
    const promises = testBlogs.map(blog => blog.save())
    await Promise.all(promises)
})

describe('blog API when there was something saved, /api/blogs', () => {
    const testedURL = '/api/blogs'

    test('GET content type is json', async () => {
        await api.get(testedURL)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('GET correct amount of blogs is returned', async () => {
        const response = await api.get(testedURL)
        expect(response.body.length).toBe(testData.blogs.length)
    })

    test('GET blogs contain field id', async () => {
        const response = await api.get(testedURL)
        expect(response.body[0].id).toBeTruthy()
    })

    test('POST blog is added and its correct', async () => {
        const blog = new Blog({
            title: 'new title',
            author: 'Author authorium',
            url: 'http://website.org/blog/first',
            likes: 10
        })
        const savedBlog = await blog.save()
        const allBlogs = await api.get(testedURL)

        expect(allBlogs.body.length).toBe(testData.blogs.length + 1)
        expect(savedBlog).toBe(blog)
    })

    test('POST if field likes not set, set it to 0', async () => {
        const blog = new Blog({
            title: 'new title',
            author: 'Author authorium',
            url: 'http://website.org/blog/first'
        })
        const savedBlog = await blog.save()

        expect(savedBlog.likes).toBe(0)
    })

    test('POST if fields title,url not set, respond status code 400', async () => {
        const blog = new Blog({
            author: 'Author authorium',
            likes: 0
        })

        await api
            .post(testedURL)
            .send(blog)
            .expect(400)
    })
})

describe('single blogs with data already added, /api/blogs/some_id', () => {
    const blog = new Blog({
        title: 'new title',
        author: 'Author authorium',
        url: 'http://website.org/blog/first',
        likes: 10
    })

    test('DELETE if blog exists 204', async () => {
        const savedBlog = await blog.save()

        await api
        .delete(`/api/blogs/${savedBlog.id}`)
        .expect(204)

    })

    test('DELETE if blog doesnt exist code 400', async () => {
        await api
        .delete(`/api/blogs/doesntexist`)
        .expect(400)
    })

    test('PUT with correct id return the updated blog', async () => {
        const savedBlog = await api.post('/api/blogs').send(blog)
        const updatedValues = {...savedBlog.body, title : 'new name for title'}
        const updatedBlog = await api
        .put(`/api/blogs/${savedBlog.body.id}`)
        .send(updatedValues)

        expect(updatedBlog.body).toStrictEqual(updatedValues)
    })

    test('PUT with incorrect id returns 400', async () => {
        await api
        .put(`/api/blogs/doesntexist`)
        .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})