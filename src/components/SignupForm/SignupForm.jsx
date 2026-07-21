import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import AgreementList, {
    initialAgreements,
    isRequiredAgreed,
} from '../AgreementList/AgreementList';
import './SignupForm.css';

export default function SignupForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const [agreements, setAgreements] = useState(initialAgreements);
    const [showAgreementError, setShowAgreementError] = useState(false);

    // API 연동용 상태
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    // 비밀번호: 8자 이상, 영문과 숫자 포함
    const validatePassword = (value) =>
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);

    const handleAgreementChange = (next) => {
        setAgreements(next);
        setShowAgreementError(false);
    };

    const handleSignup = async (e) => {
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
        } else if (!validatePassword(password)) {
            setPasswordError('8자 이상, 영문과 숫자를 포함해 주세요');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!name.trim()) {
            setNameError('이름을 입력해주세요');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!isRequiredAgreed(agreements)) {
            setShowAgreementError(true);
            hasError = true;
        }

        if (hasError) return;

        // TODO: 👇 API 연동 지점
        // setLoading(true);
        // try {
        //     await signupApi({ email, password, name, agreements });
        //     navigate('/studio');
        // } catch (err) {
        //     setError(err.message || '회원가입에 실패했습니다.');
        // } finally {
        //     setLoading(false);
        // }

        navigate('/studio'); // 임시
    };

    return (
        <section className="signup-form" aria-label="회원가입">
            <h1 className="signup-form__title">계정 만들기</h1>
            <p className="signup-form__subtitle">
                30초면 충분합니다. 신용카드도 필요 없어요.
            </p>

            <form
                className="signup-form__fields"
                onSubmit={handleSignup}
                noValidate
            >
                <FormField
                    id="signup-email"
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
                    hint="로그인과 알림 수신에 사용됩니다"
                />

                <FormField
                    id="signup-password"
                    name="password"
                    label="비밀번호"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    isPassword
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                    }}
                    error={passwordError}
                    hint="영문과 숫자 포함 8자 이상"
                />

                <FormField
                    id="signup-name"
                    name="name"
                    type="text"
                    label="이름"
                    placeholder="홍길동"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setNameError('');
                    }}
                    error={nameError}
                />

                <AgreementList
                    agreements={agreements}
                    onChange={handleAgreementChange}
                    showError={showAgreementError}
                />

                {error && (
                    <p className="signup-form__error" role="alert">
                        {error}
                    </p>
                )}

                <Button
                    variant="primary"
                    size="lg"
                    block
                    type="submit"
                    className="signup-form__submit"
                    disabled={loading}
                >
                    {loading ? '가입 중...' : '계정 만들기'}
                </Button>
            </form>

            <p className="signup-form__alt">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="signup-form__alt-link">
                    로그인
                </Link>
            </p>
        </section>
    );
}
