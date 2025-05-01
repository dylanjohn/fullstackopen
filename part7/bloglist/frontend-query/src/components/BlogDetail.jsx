import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { ThumbsUp } from 'lucide-react';
import blogService from '../services/blogs';

const BlogDetail = ({ handleLike, handleDelete, handleComment, user }) => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment) {
      handleComment(id, comment);
      setComment('');
    }
  };

  if (result.isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-pulse text-gray-500">Loading blog details...</div>
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
        Error loading blogs: {result.error.message}
        <div className="mt-4">
          <Link 
            to="#"
            onClick={(e) => {
              e.preventDefault();
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  const blog = result.data.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 mb-4">Blog not found</p>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/');
            }
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          Back
        </Link>
      </div>
    );
  }

  const showDeleteButton = blog.user?.username === user?.username;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {blog.title} by {blog.author}
      </h2>

      <div className="mb-4">
        <a 
          href={blog.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {blog.url}
        </a>
      </div>

      <div className="flex items-center mb-4">
        <span className="mr-2">{blog.likes || 0} likes</span>
        <button 
          onClick={() => handleLike(blog)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm flex items-center"
        >
          <ThumbsUp size={14} className="mr-1" />
          <span>like</span>
        </button>
      </div>

      <div className="text-gray-500 mb-4">
        {blog.user ? `Added by ${blog.user.name}` : 'Unknown author'}
      </div>

      {showDeleteButton && (
        <div className="mb-6">
          <button 
            onClick={() => handleDelete(blog)}
            className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md text-sm"
          >
            remove
          </button>
        </div>
      )}

      <div className="border-t border-gray-100 pt-6 mt-6">
        <h3 className="text-md font-medium mb-4">Comments</h3>
        
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <div className="flex">
            <input
              id="comment"
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="Write your comment here"
              className="flex-grow px-3 py-2 border border-gray-200 rounded-l-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <button 
              type="submit"
              className="bg-black text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800"
            >
              add comment
            </button>
          </div>
        </form>

        {blog.comments && blog.comments.length > 0 ? (
          <ul className="space-y-2 pl-5 list-disc">
            {blog.comments.map((comment, index) => (
              <li key={index} className="text-gray-700">{comment}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">No comments yet</p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/');
            }
          }}
          className="text-gray-600 hover:text-gray-900"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;