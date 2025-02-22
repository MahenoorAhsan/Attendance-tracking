// // src/components/PrivateRoute.tsx
// import { Navigate } from 'react-router-dom';
// import { RoutePaths } from '../app/Router';

// interface PrivateRouteProps {
//   element: React.ReactElement;
// }

// export const PrivateRoute = ({ element }: PrivateRouteProps) => {
//   const isAuthenticated = !!localStorage.getItem('authToken'); // Your auth logic

//   return isAuthenticated ? (
//     element
//   ) : (
//     <Navigate to={RoutePaths.LOGIN} replace />
//   );
// };