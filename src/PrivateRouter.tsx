import { Navigate } from 'react-router';
import React, {  ReactNode } from 'react';
import { Context } from './components/HomePage';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {user} = React.useContext(Context); 
  const userID = user.id;
  const storedUserId = localStorage.getItem('userId');
  return userID || storedUserId ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;