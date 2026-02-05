import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import Welcome from './pages/Welcome';
import ProtectRoutes from './components/ProtectRoutes';
import OpenRoutes from './components/OpenRoutes';
import { ToastProvider } from './context/ToastContext';
import FindYourAccount from './pages/FindYourAccount';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { Alert } from 'flowbite-react';
// import { useToast } from './context/ToastContext';
// import Toast from '../components/Toast';
// import AuthenticatedLayout from './components/AuthenticatedLayout';
const App = () => {
// const toast = useToast()
  const socket = io('http://localhost:3000');

  useEffect(()=>{
    socket.on('order' ,(data)=>{
      alert(`your order status has been updated to ${data}`)
  },[])



})
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          {/* <Route path="/welcome/:id" element={<Welcome />} /> */}
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
            path="/checkout"
            element={
              <ProtectRoutes>
                <Checkout />
              </ProtectRoutes>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectRoutes>
                <Cart />
              </ProtectRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectRoutes>
                <Dashboard />
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
            path="/recovery"
            element={
              <OpenRoutes>
                <FindYourAccount />
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