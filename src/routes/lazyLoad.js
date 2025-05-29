import { lazy } from 'react';

// Lazy load route components
export const Maintenance = lazy(() => import('../pages/Maintenance'));

// Add other route components as needed
// Example:
// export const Home = lazy(() => import('../pages/Home'));
// export const About = lazy(() => import('../pages/About'));