import { createContext, useReducer, useContext, useEffect } from 'react';
import blogService from '../services/blogs';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  // Check local storage when the app loads
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: 'SET_USER', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const login = (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    dispatch({ type: 'REMOVE_USER' });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};