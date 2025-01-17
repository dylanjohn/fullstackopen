const BlogForm = ({ title, author, url, handleSubmit, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input 
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input 
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input 
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    )
  }
  
  export default BlogForm