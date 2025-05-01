import { useQuery } from 'react-query';
import { Link } from 'react-router';
import userService from '../services/users';

const UsersList = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  });

  if (result.isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-pulse text-gray-500">Loading users...</div>
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
        Error loading users: {result.error.message}
      </div>
    );
  }

  const users = result.data || [];

  if (users.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-2 text-xs font-medium uppercase text-gray-500">User</th>
              <th className="pb-2 text-xs font-medium uppercase text-gray-500">Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user.id}
                className={`${index !== users.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}
              >
                <td className="py-3 pr-4">
                  <Link 
                    to={`/users/${user.id}`}
                    className="text-gray-900 hover:text-black"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="py-3 text-gray-500">
                  {user.blogs ? user.blogs.length : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;