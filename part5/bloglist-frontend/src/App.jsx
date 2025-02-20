import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Welcome back ${user.name}!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Invalid username or password. Please try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const blogWithUser = {
          ...returnedBlog,
          user: {
            username: user.username,
            name: user.name,
            id: user.id
          }
        }
        setBlogs(blogs.concat(blogWithUser))
        setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} was added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.error('Error creating blog:', error)
        setErrorMessage('Failed to create blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: (blog.likes || 0) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)

      // Create new array of blogs
      const updatedBlogs = blogs.map(currentBlog => {
        // If not updating, keep it as is
        if (currentBlog.id !== blog.id) {
          return currentBlog
        }

        // If updating, return the updated version
        // Keep original user object
        return {
          ...returnedBlog,
          user: blog.user
        }
      })

      // Update the state with our new array
      setBlogs(updatedBlogs)
    } catch (error) {
      setErrorMessage('Failed to update likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setSuccessMessage(`Blog '${blog.title}' was successfully deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (error) {
        setErrorMessage('Failed to delete blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <h2>{!user ? 'login to application' : 'blogs'}</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      {user && (
        <div>
          <div>
            <span>{user.name} logged in</span>{' '}
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              setUser(null)
            }}>
              logout
            </button>
          </div>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogsList
            blogs={blogs}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  )
}

export default App