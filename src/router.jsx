import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import StudioPage from './pages/Studio/StudioPage';

const router = createBrowserRouter([
    { path: '/', element: <MainPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/studio', element: <StudioPage /> },
]);

export default router;