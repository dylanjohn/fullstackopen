import { Link, useLocation } from 'react-router';
import { Book, Users, LogOut } from 'lucide-react';

const Navigation = ({ user, logout, setNotification }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="mt-6 mb-6">
      <nav className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-2 py-2 ${
              path === '/' 
                ? 'text-black font-medium border-b-2 border-black' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Book size={18} />
            <span>Blogs</span>
          </Link>
          <Link
            to="/users"
            className={`flex items-center space-x-2 py-2 ${
              path.startsWith('/users') 
                ? 'text-black font-medium border-b-2 border-black' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">{user.name} logged in</span>
          <button
            onClick={() => {
              logout();
              setNotification('Logged out successfully', 'info');
            }}
            className="flex items-center space-x-1 bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;