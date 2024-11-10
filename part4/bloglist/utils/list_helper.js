const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

function totalLikes(blogs) {
  if (!blogs || blogs.length === 0) return null
  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((sum, likes) => sum + likes, 0)
}

function favoriteBlog(blogs) {
  if (!blogs || blogs.length === 0) return null
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  const blog = blogs[likes.indexOf(maxLikes)]
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  let maxBlogs = 0
  let topAuthor = ''

  for (const [author, count] of Object.entries(authorCounts)) {
    if (count > maxBlogs) {
      maxBlogs = count
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

