import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';
import './LoginForm.css';

export default function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showForgot, setShowForgot] = useState(false);

    // API 연동용 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        let hasError = false;

        if (!email.trim()) {
            setEmailError('이메일을 입력해주세요');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('올바른 이메일 형식이 아닙니다');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('비밀번호를 입력해주세요');
            hasError = true;
        } else if (password.length < 8) {
            setPasswordError('비밀번호는 8자 이상이어야 합니다');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) return;

        // TODO: 👇 API 연동 지점
        // setLoading(true);
        // try {
        //     await loginApi({ email, password });
        //     navigate('/studio');
        // } catch (err) {
        //     setError(err.message || '로그인에 실패했습니다.');
        // } finally {
        //     setLoading(false);
        // }

        navigate('/studio'); // 임시
    };

    return (
        <section className="login-form" aria-label="로그인">
            <h1 className="login-form__title">다시 오신 것을 환영합니다</h1>
            <p className="login-form__subtitle">
                계정에 로그인하고 작업을 이어가세요.
            </p>

            <form
                className="login-form__fields"
                onSubmit={handleLogin}
                noValidate
            >
                <FormField
                    id="login-email"
                    name="email"
                    type="email"
                    label="이메일"
                    placeholder="name@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                    }}
                    error={emailError}
                />

                <FormField
                    id="login-password"
                    name="password"
                    label="비밀번호"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    isPassword
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                    }}
                    error={passwordError}
                />

                <div className="login-form__row">
                    <label className="login-form__remember">
                        <input type="checkbox" name="remember" />
                        <span>로그인 상태 유지</span>
                    </label>
                    <button
                        type="button"
                        className="login-form__forgot"
                        onClick={() => setShowForgot(true)}
                    >
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                {error && (
                    <p className="login-form__error" role="alert">
                        {error}
                    </p>
                )}

                <Button
                    variant="primary"
                    size="lg"
                    block
                    type="submit"
                    className="login-form__submit"
                    disabled={loading}
                >
                    {loading ? '로그인 중...' : '로그인'}
                </Button>
            </form>

            <p className="login-form__alt">
                계정이 없으신가요?{' '}
                <Link to="/signup" className="login-form__alt-link">
                    회원가입
                </Link>
            </p>

            {showForgot && (
                <ForgotPasswordModal onClose={() => setShowForgot(false)} />
            )}
        </section>
    );
}
