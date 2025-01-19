import Blog from './Blog'

const BlogsList = ({ blogs, user, handleLike }) => {

  const filteredBlogs = blogs.filter(blog => 
    blog.user && blog.user.username === user.username
  )

  const sortedBlogs = filteredBlogs.sort((a, b) => 
    (b.likes || 0) - (a.likes || 0)
  )

  if (sortedBlogs.length === 0) {
    return <p>No blogs found</p>
  }

  return (
    sortedBlogs.map(blog =>
      <Blog 
        key={blog.id} 
        blog={blog} 
        handleLike={handleLike}
      />
    )
  )
}
  
  export default BlogsList