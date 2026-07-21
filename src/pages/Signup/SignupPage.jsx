import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

export default function SignupPage() {
    return (
        <div className="signup-page">
            <AuthHeader />
            <main className="signup-page__main">
                <SignupForm />
            </main>
        </div>
    );
}
