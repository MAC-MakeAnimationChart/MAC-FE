import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from './layout/AppShell';
import MainPage from './pages/Main/MainPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import StudioPage from './pages/Studio/StudioPage';
import PricingPage from './pages/Pricing/PricingPage';
import WorkspacePage from './pages/Workspace/WorkspacePage';

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/studio', element: <StudioPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/workspace', element: <WorkspacePage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
