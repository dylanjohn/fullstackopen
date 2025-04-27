import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from 'react-query';
import blogService from '../services/blogs';

const BlogDetail = ({ handleLike, handleDelete, handleComment, user }) => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  });

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment) {
      handleComment(id, comment);
      setComment('');
    }
  };

  if (result.isLoading) {
    return <div>Loading blog details...</div>;
  }

  if (result.isError) {
    return <div>Error loading blogs: {result.error.message}</div>;
  }

  const blog = result.data.find(b => b.id === id);

  if (!blog) {
    return (
      <div>
        <p>Blog not found</p>
        <Link to="/">Back to blogs</Link>
      </div>
    );
  }

  const showDeleteButton = blog.user?.username === user?.username;

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      
      <div>
        {blog.likes || 0} likes
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      
      <div>
        {blog.user ? `added by ${blog.user.name}` : 'Unknown author'}
      </div>
      
      {showDeleteButton && (
        <div>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
      )}
      
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Write your comment here"
          />
          <button type="submit">add comment</button>
        </div>
      </form>
      
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
      
      <div>
        <Link to="/">Back to blogs</Link>
      </div>
    </div>
  );
};

export default BlogDetail;