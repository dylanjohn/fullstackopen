import { Link } from 'react-router';
import { ThumbsUp } from 'lucide-react';

const Blog = ({ blog }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 pr-4">
        <Link 
          to={`/blogs/${blog.id}`}
          className="text-gray-900 hover:text-black"
        >
          {blog.title}
        </Link>
      </td>
      <td className="py-3 pr-4 text-gray-500">
        {blog.author || 'Anonymous'}
      </td>
      <td className="py-3 text-center">
        <div className="flex items-center justify-center text-gray-600">
          <ThumbsUp size={14} className="mr-1" />
          <span>{blog.likes || 0}</span>
        </div>
      </td>
    </tr>
  );
};

export default Blog;