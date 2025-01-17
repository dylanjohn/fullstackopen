import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
  
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
        setSuccessMessage(`A new blog ${title} by ${author} was added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(error => {
        console.error('Error creating blog:', error)
        setErrorMessage('Failed to create blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>{!user ? 'login to application' : 'blogs'}</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>

      {!user && loginForm()}
      {user && (
        <div>
          <div>
            <span>{user.name} logged in</span>{" "}
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              setUser(null)
            }}>
              Logout
            </button>
          </div>

          <h2>create new</h2>

          <BlogForm 
            title={title}
            author={author}
            url={url}
            handleSubmit={addBlog}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
          />

          {(() => {
            const userBlogs = blogs.filter(blog => 
              blog.user && blog.user.username === user.username
            );
            return userBlogs.length === 0 
              ? <p>No blogs found</p>
              : userBlogs.map(blog => <Blog key={blog.id} blog={blog} />)
          })()}
        </div>
      )}
    </div>
  )
}

export default App