import { useQuery } from 'react-query';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogsList = ({ user, handleLike, handleDelete }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });

  if (result.isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-pulse text-gray-500">Loading blogs...</div>
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
        Error loading blogs: {result.error.message}
      </div>
    );
  }

  const blogs = result.data || [];

  const sortedBlogs = blogs.sort((a, b) => (b.likes || 0) - (a.likes || 0));

  if (sortedBlogs.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        <p>No blogs found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left">
            <th className="pb-2 text-xs font-medium uppercase text-gray-500">Title</th>
            <th className="pb-2 text-xs font-medium uppercase text-gray-500">Author</th>
            <th className="pb-2 text-xs font-medium uppercase text-gray-500 text-center">Likes</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsList;