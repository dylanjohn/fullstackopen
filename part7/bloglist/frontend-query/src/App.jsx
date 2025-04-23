import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import BlogsList from './components/BlogsList';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
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

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1
  });

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification(`A new blog ${newBlog.title} by ${newBlog.author} was added`, 'success');
      if (blogFormRef.current) {
        blogFormRef.current.toggleVisibility();
      }
    },
    onError: (error) => {
      setNotification('Failed to create blog', 'error');
    }
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: () => {
      setNotification('Failed to update likes', 'error');
    }
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setNotification('Blog was successfully deleted', 'success');
    },
    onError: () => {
      setNotification('Failed to delete blog', 'error');
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const user = await loginService.login({
        username,
        password,
      });
  
      login(user); // This handles localStorage and token setting
      setUsername('');
      setPassword('');
      setNotification(`Welcome back ${user.name}!`, 'success');
    } catch (exception) {
      setNotification('Invalid username or password. Please try again.', 'error');
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
      updatedBlog 
    });
  };
  
  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  if (result.isLoading) {
    return <div>Loading blogs...</div>;
  }
  
  if (result.isError) {
    return <div>Error loading blogs: {result.error.message}</div>;
  }

  return (
    <div>
      <h2>{!user ? 'login to application' : 'blogs'}</h2>
      <Notification />

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}

      {user && (
        <div>
          <div>
            <span>{user.name} logged in</span>{' '}
            <button
              onClick={() => {
                logout();
                setNotification('Logged out successfully', 'info');
              }}
            >
              logout
          </button>
          </div>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogsList
            blogs={result.data || []}
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default App;
