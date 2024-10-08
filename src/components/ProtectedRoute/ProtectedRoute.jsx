import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  if (!localStorage.getItem('accessToken')) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
