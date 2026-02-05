import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthenticatedLayout from './AuthenticatedLayout';

function ProtectRoutes({children}) {
    const accessToken = localStorage.getItem('accessToken');
    const sessionToken = localStorage.getItem('sessionToken');
    
    // Allow access if user has either accessToken (logged in) or sessionToken (guest)
    if(!accessToken && !sessionToken){
        return <Navigate to='/login'/>
    }
    
  return (
    <div>
      <AuthenticatedLayout>
      {children}
      </AuthenticatedLayout>
    </div>
  )
}

export default ProtectRoutes