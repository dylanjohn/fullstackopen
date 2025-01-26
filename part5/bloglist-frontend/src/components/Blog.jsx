import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButton = blog.user?.username === user?.username

  return (
    <div style={blogStyle} className="blog-item">
      <div style={hideWhenVisible} className="blog-basic">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className="blog-details">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes || 0}
          <button id="like-button" onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {showDeleteButton && 
          <button onClick={() => handleDelete(blog)}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog