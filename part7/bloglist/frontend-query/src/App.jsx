import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Routes, Route, Link } from 'react-router';
import { Book, Users, LogOut } from 'lucide-react';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import UsersList from './components/UsersList';
import UserDetail from './components/UserDetail';
import BlogDetail from './components/BlogDetail';
import './index.css';

import { useNotification } from './contexts/NotificationContext';
import { useAuth } from './contexts/UserContext';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  const queryClient = useQueryClient();
  const { notification, setNotification } = useNotification();
  const { user, login, logout } = useAuth();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} was added`,
        'success'
      );
      if (blogFormRef.current) {
        blogFormRef.current.toggleVisibility();
      }
    },
    onError: (error) => {
      setNotification('Failed to create blog', 'error');
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: () => {
      setNotification('Failed to update likes', 'error');
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification('Blog was successfully deleted', 'success');
    },
    onError: () => {
      setNotification('Failed to delete blog', 'error');
    },
  });

  const commentBlogMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification('Comment added successfully', 'success');
    },
    onError: () => {
      setNotification('Failed to add comment', 'error');
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      login(user);
      setUsername('');
      setPassword('');
      setNotification(`Welcome back ${user.name}!`, 'success');
    } catch (exception) {
      setNotification(
        'Invalid username or password. Please try again.',
        'error'
      );
    }
  };

  const addBlog = (blogObject) => {
    createBlogMutation.mutate(blogObject);
  };

  const handleLike = (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: (blog.likes || 0) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    updateBlogMutation.mutate({
      id: blog.id,
      updatedBlog,
    });
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleComment = (id, comment) => {
    commentBlogMutation.mutate({ id, comment });
  };

  return (
    <div className={!user ? 'bg-gray-50 min-h-screen' : ''}>
      <div
        className={`px-4 py-6 ${user ? 'max-w-4xl mx-auto' : 'container mx-auto'}`}
      >
        {!user ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-md mb-4">
              <Notification />
            </div>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-2">Blogs</h1>
            <Notification />

            <div className="mt-6 mb-6">
              <nav className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Link
                    to="/"
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2"
                  >
                    <Book size={18} />
                    <span>Blogs</span>
                  </Link>
                  <Link
                    to="/users"
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2"
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
                    className="flex items-center space-x-1 bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      user={user}
                      blogFormRef={blogFormRef}
                      addBlog={addBlog}
                      handleLike={handleLike}
                      handleDelete={handleDelete}
                    />
                  }
                />
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route
                  path="/blogs/:id"
                  element={
                    <BlogDetail
                      handleLike={handleLike}
                      handleDelete={handleDelete}
                      handleComment={handleComment}
                      user={user}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
