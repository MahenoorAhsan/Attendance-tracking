// src/app/Router.tsx
import { BrowserRouter, RouterProvider ,Navigate, createBrowserRouter} from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Attendance } from '../components/Attendance/Attendance';
import { Login } from '../components/Login/Login';
import { Layout } from '../components/Layout/Layout';
//import { PrivateRoute } from '../components/PrivateRoute';
import React from 'react';

export enum RoutePaths {
  ROOT = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  ATTENDANCE = '/attendance',
}
const AuthRedirect = () => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    return isAuthenticated ? (
      <Navigate to={RoutePaths.DASHBOARD} replace />
    ) : (
      <Navigate to={RoutePaths.LOGIN} replace />
    );
  };
  
const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <AuthRedirect />, // New auth redirect component
  },
  {
    path: RoutePaths.LOGIN,
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: RoutePaths.DASHBOARD,
        // element: <PrivateRoute element={<Dashboard />} />,
        element: <Dashboard />
      },
      {
        path: RoutePaths.ATTENDANCE,
        // element: <PrivateRoute element={<Attendance />} />,
        element: <Attendance />,
      },
    ],
  },
//   {
//     path: RoutePaths.LOGIN,
//     element: <Login />,
//   },
//   {
//     path: RoutePaths.DASHBOARD,
//     element: <Dashboard />
//   },
]);

// Auth redirect component for root path
export const AppRouter = () => {
  return (
    // <BrowserRouter>
      <RouterProvider router={router} />
    // </BrowserRouter>
  );
};