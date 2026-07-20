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
      { path: '/workspace', element: <Navigate to="/workspace/projects" replace /> },
      { path: '/workspace/projects', element: <WorkspacePage section="projects" /> },
      { path: '/workspace/templates', element: <WorkspacePage section="templates" /> },
      { path: '/workspace/charts', element: <WorkspacePage section="charts" /> },
      { path: '/workspace/settings', element: <WorkspacePage section="settings" /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
