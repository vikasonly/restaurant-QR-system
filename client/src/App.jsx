import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Welcome from '../src/pages/welcome';
import ProtectRoutes from './components/ProtectRoutes';
import OpenRoutes from './components/OpenRoutes';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route
            path="/welcome"
            element={
            
                <Welcome />
            
            }
          />

          <Route
            path="/"
            element={
              //required accessToken to get this page
              <ProtectRoutes>
                <Homepage />
              </ProtectRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <OpenRoutes>
                <Login />
              </OpenRoutes>
            }
          />

          <Route
            path="/register"
            element={
              <OpenRoutes>
                <Register />
              </OpenRoutes>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;