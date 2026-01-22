// Example admin routes configuration
// Add these routes to your main App.jsx or router configuration

import {
  Dashboard,
  StationManagement,
  TrainManagement,
  UserManagement,
  FareStructure,
  RefundTransaction,
  CreateAnnouncement
} from './components';

// Example routes array for React Router
export const adminRoutes = [
  {
    path: '/admin',
    element: <Dashboard />,
    index: true
  },
  {
    path: '/admin/stations',
    element: <StationManagement />
  },
  {
    path: '/admin/trains',
    element: <TrainManagement />
  },
  {
    path: '/admin/users',
    element: <UserManagement />
  },
  {
    path: '/admin/fares',
    element: <FareStructure />
  },
  {
    path: '/admin/refunds',
    element: <RefundTransaction />
  },
  {
    path: '/admin/announcements',
    element: <CreateAnnouncement />
  }
];

// Example usage in App.jsx:
/*
import { Routes, Route } from 'react-router';
import { adminRoutes } from './admin/routes';

function App() {
  return (
    <Routes>
      {adminRoutes.map((route, index) => (
        <Route 
          key={index}
          path={route.path} 
          element={route.element}
          index={route.index}
        />
      ))}
    </Routes>
  );
}
*/