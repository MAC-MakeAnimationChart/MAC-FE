import AuthHeader from '../../components/AuthHeader/AuthHeader';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

export default function LoginPage() {
    return (
        <div className="login-page">
            <AuthHeader />
            <main className="login-page__main">
                <LoginForm />
            </main>
        </div>
    );
}
