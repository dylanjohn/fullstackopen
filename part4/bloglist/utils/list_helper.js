
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

