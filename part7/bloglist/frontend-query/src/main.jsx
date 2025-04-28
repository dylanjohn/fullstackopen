import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <UserProvider>
          <Theme>
            <App />
          </Theme>
        </UserProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </Router>
);