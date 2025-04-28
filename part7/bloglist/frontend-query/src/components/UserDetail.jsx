import { useParams, Link } from 'react-router';
import { useQuery } from 'react-query';
import userService from '../services/users';

const UserDetail = () => {
  const { id } = useParams();
  
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  });

  if (result.isLoading) {
    return <div>Loading user details...</div>;
  }

  if (result.isError) {
    return <div>Error loading users: {result.error.message}</div>;
  }

  const user = result.data.find(u => u.id === id);

  if (!user) {
    return (
      <div>
        <p>User not found</p>
        <Link to="/users">Back</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>
      
      {user.blogs && user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs added yet</p>
      )}
      
      <div>
        <Link to="/users">Back</Link>
      </div>
    </div>
  );
};

export default UserDetail;