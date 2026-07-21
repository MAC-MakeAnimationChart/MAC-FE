import { Link } from 'react-router-dom';
import './AuthHeader.css';

export default function AuthHeader() {
    return (
        <header className="auth-header">
            <div className="auth-header__inner">
                <Link to="/" className="auth-header__logo">MAC Studio</Link>
            </div>
        </header>
    );
}
