const listHelper = require('../utils/list_helper')
const testData = require('./blog_testdata')

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    const listOfBlogs = testData.blogs
    const oneBlog = testData.oneBlog
    const totalLikes = testData.totalLikes

    test('of empty list returns zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('likes equal blog likes when only one blog is present', () => {
        expect(listHelper.totalLikes([oneBlog])).toBe(oneBlog.likes)
    })

    test('of a list is calculated right', () => {
        expect(listHelper.totalLikes(listOfBlogs)).toBe(totalLikes)
    })
})

describe('favorite blog', () => {
    const listOfBlogs = testData.blogs
    const oneBlog = testData.oneBlog
    const favorite = testData.mostLikes

    test('of empty list returns empty object', () => {
        expect(
            listHelper.favoriteBlog([])
        ).toEqual({})
    })

    test('is the only blog present', () => {
        expect(
            listHelper.favoriteBlog([oneBlog])
        ).toEqual(oneBlog)
    })

    test('of a list is the correct blog', () => {
        expect(
            listHelper.favoriteBlog(listOfBlogs)
        ).toEqual(favorite)
    })
})

describe('most blogs', () => {
    const listOfBlogs = testData.blogs
    const oneBlog = testData.oneBlog
    const most = testData.mostBlogs

    test('of empty list returns empty object', () => {
        expect(
            listHelper.mostBlogs([])
        ).toEqual({})
    })

    test('from list of one is the only author present', () => {
        expect(
            listHelper.mostBlogs([oneBlog])
        ).toEqual({ author: 'Michael Chan', blogs: 1 })
    })

    test('of a list of blogs return correct object', () => {
        expect(
            listHelper.mostBlogs(listOfBlogs)
        ).toEqual(most)
    })
})

describe('most likes', () => {
    const listOfBlogs = testData.blogs
    const oneBlog = testData.oneBlog
    const most = testData.mostLikesSum

    test('of empty list returns empty object', () => {
        expect(
            listHelper.mostLikes([])
        ).toEqual({})
    })

    test('from list of one is the only author present', () => {
        expect(
            listHelper.mostLikes([oneBlog])
        ).toEqual({ author: 'Michael Chan', likes: oneBlog.likes })
    })

    test('of a list of blogs return correct object', () => {
        expect(
            listHelper.mostLikes(listOfBlogs)
        ).toEqual(most)
    })
})
