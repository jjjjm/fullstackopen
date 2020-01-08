const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    reducer = (sumOfLikes, blog) => {
        return sumOfLikes + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    reducer = (current, blog) => {
        return !current.likes
            ? blog
            : blog.likes > current.likes
                ? blog
                : current
    }
    return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
    const _ = require('lodash')
    reducer = (counts, blog) => {
        newCounts = counts
        newCountEntry = { author: blog.author, blogs: 1 }
        if (newCounts.all[blog.author]) {
            newCounts.all[blog.author].blogs += 1
        } else {
            newCounts.all[blog.author] = { author: blog.author, blogs: 1 }
        }
        if (_.isEmpty(counts.most)) {
            newCounts.most = newCountEntry
        }
        if (newCounts.all[blog.author].blogs > newCounts.most.blogs) {
            newCounts.most = newCounts.all[blog.author]
        }
        return newCounts
    }
    return blogs.reduce(reducer, { most: {}, all: {} }).most
}

const mostLikes = (blogs) => {
    const _ = require('lodash')
    reducer = (counts, blog) => {
        newCounts = counts
        if (newCounts.all[blog.author]) {
            newCounts.all[blog.author].likes += blog.likes
        } else {
            newCounts.all[blog.author] = { author: blog.author, likes: blog.likes }
        }
        if (_.isEmpty(counts.most)) {
            newCounts.most = { author: blog.author, likes: blog.likes }
        }
        if (newCounts.all[blog.author].likes > newCounts.most.likes) {
            newCounts.most = newCounts.all[blog.author]
        }
        return newCounts
    }
    return blogs.reduce(reducer, { most: {}, all: {} }).most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}