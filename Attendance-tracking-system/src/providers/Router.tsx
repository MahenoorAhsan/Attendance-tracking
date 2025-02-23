// src/app/Router.tsx
import { BrowserRouter, RouterProvider ,Navigate, createBrowserRouter, Outlet} from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Attendance } from '../components/Attendance/Attendance';
import { Login } from '../components/Login/Login';
import { Layout } from '../components/Layout/Layout';
import { Students } from '@/components/Students/Students';
import { Staffs } from '@/components/Staffs/Staffs';

//import { PrivateRoute } from '../components/PrivateRoute';
import React from 'react';
import Cookies from 'js-cookie';

export enum RoutePaths {
  ROOT = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  ATTENDANCE = '/attendance',
  STUDENTS ='/students',
  STAFFS ='/staffs'
}
const AuthRedirect = () => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    return isAuthenticated ? (
      <Navigate to={RoutePaths.DASHBOARD} replace />
    ) : (
      <Navigate to={RoutePaths.LOGIN} replace />
    ) 
  };
const PrivateRouteWrapper = () => {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={RoutePaths.DASHBOARD} replace />;
};

// Public route wrapper (for login page)
const PublicRoute = ({ element }: { element: React.ReactElement }) => {
  // const isAuthenticated = checkAuth();
  // return isAuthenticated ? <Navigate to={RoutePaths.LOGIN} replace /> : element;
  return element;
};

// Authentication check function (modify according to your auth system)
const checkAuth = () => {
  return !Cookies.get('access_token');
};
  
const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <AuthRedirect />, // New auth redirect component
  },
  {
    path: RoutePaths.LOGIN,
    element: <PublicRoute element={<Login />} />,
  },
  {
    element: <PrivateRouteWrapper />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: RoutePaths.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: RoutePaths.STUDENTS,
            element: <Students />,
          },
          {
            path: RoutePaths.STAFFS,
            element: <Staffs />,
          },
          {
            path: RoutePaths.ATTENDANCE,
            element: <Attendance />,
          },
        ],
      },
    ],
  },
]);

// Auth redirect component for root path
export const AppRouter = () => {
  return (
    // <BrowserRouter>
      <RouterProvider router={router} />
    // </BrowserRouter>
  );
};