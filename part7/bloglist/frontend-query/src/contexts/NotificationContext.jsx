import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, type: action.payload.type };
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  const setNotification = (message, type = 'info', timeout = 5000) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' });
    }, timeout);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
