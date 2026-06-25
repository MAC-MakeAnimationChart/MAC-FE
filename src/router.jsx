import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import StudioPage from './pages/Studio/StudioPage';
import WorkspacePage from './pages/WorkspacePage/WorkspacePage'; // 워크스페이스 페이지 임포트

const router = createBrowserRouter([
    { path: '/', element: <MainPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/studio', element: <StudioPage /> },
    { path: '/workspace', element: <WorkspacePage /> }, // 마이페이지(워크스페이스) 경로
]);

export default router;