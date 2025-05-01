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
    return <div>Loading users...</div>;
  }

  if (result.isError) {
    return <div>Error loading users: {result.error.message}</div>;
  }

  const users = result.data || [];

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && <p>No users found</p>}
    </div>
  );
};

export default UsersList;
