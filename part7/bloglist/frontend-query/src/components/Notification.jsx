import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification || !notification.message) {
    return null;
  }

  // Get the appropriate icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'error':
        return <XCircle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className={`notification notification-${notification.type}`}>
      <div className="notification-icon">
        {getIcon()}
      </div>
      <div className="notification-message">
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;