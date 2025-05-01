import { useParams, Link } from 'react-router';
import { useQuery } from 'react-query';
import userService from '../services/users';

const UserDetail = () => {
  const { id } = useParams();

  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  if (result.isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-pulse text-gray-500">Loading user details...</div>
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
        Error loading users: {result.error.message}
        <div className="mt-4">
          <Link to="/users" className="text-gray-600 hover:text-gray-900">
            Back to users
          </Link>
        </div>
      </div>
    );
  }

  const user = result.data.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 mb-4">User not found</p>
        <Link 
          to="/users" 
          className="text-gray-600 hover:text-gray-900"
        >
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{user.name}</h2>

      <h3 className="text-md font-medium mb-3">Added blogs</h3>

      {user.blogs && user.blogs.length > 0 ? (
        <ul className="space-y-2 pl-6 list-disc">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link 
                to={`/blogs/${blog.id}`}
                className="text-gray-900 hover:text-black"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">No blogs added yet</p>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link 
          to="/users" 
          className="text-gray-600 hover:text-gray-900"
        >
          Back to users
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;