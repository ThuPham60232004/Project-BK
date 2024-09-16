import React from 'react';
import ReactDOM from 'react-dom/client';  // Cập nhật import
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/darkModeContext';

// Tạo root với `createRoot`
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render ứng dụng vào DOM
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
