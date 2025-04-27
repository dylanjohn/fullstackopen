import { useQuery } from 'react-query';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogsList = ({ user, handleLike, handleDelete }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  });

  if (result.isLoading) {
    return <div>Loading blogs...</div>;
  }
  
  if (result.isError) {
    return <div>Error loading blogs: {result.error.message}</div>;
  }

  const blogs = result.data || [];

  const sortedBlogs = blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));

  if (sortedBlogs.length === 0) {
    return <p>No blogs found</p>;
  }

  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      user={user}
    />
  ));
};

export default BlogsList;
