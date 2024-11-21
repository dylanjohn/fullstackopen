const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.h7z0g.mongodb.net/testBlogListApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const initializeBlogs = async () => {
  try {
    await mongoose.connect(url)
    const Blog = require('./models/blog')

    const blogs = [
      new Blog({
        title: 'First test blog',
        author: 'Test Author 1',
        url: 'http://test1.com',
        likes: 5
      }),
      new Blog({
        title: 'Second test blog',
        author: 'Test Author 2',
        url: 'http://test2.com',
        likes: 10
      })
    ]

    await Promise.all(blogs.map(blog => blog.save()))
    console.log('Blogs saved successfully!')
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await mongoose.connection.close()
  }
}

initializeBlogs()