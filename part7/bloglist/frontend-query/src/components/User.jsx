import { Link } from 'react-router';

const User = ({ user }) => {
  const blogCount = user.blogs ? user.blogs.length : 0;

  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{blogCount}</td>
    </tr>
  );
};

export default User;