import { useState } from 'react';
import Button from '../Button/Button';
import FormField from '../FormField/FormField';
import './ForgotPasswordModal.css';

export default function ForgotPasswordModal({ onClose }) {
    const [step, setStep] = useState('email'); // 'email' | 'code' | 'reset'
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [emailError, setEmailError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // API 연동용 상태
    const [loading, setLoading] = useState(false);

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSendEmail = async () => {
        if (!email.trim()) {
            setEmailError('이메일을 입력해주세요');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('올바른 이메일 형식이 아닙니다');
            return;
        }
        setEmailError('');

        // TODO: 👇 API 연동 지점 — 인증 메일 전송
        // setLoading(true);
        // try {
        //     await sendResetEmailApi({ email });
        //     setStep('code');
        // } catch (err) {
        //     setEmailError(err.message || '메일 전송에 실패했습니다.');
        // } finally {
        //     setLoading(false);
        // }

        setStep('code'); // 임시
    };

    const handleVerifyCode = async () => {
        if (code.length < 6) {
            setCodeError('인증코드 6자리를 입력해주세요');
            return;
        }
        setCodeError('');

        // TODO: 👇 API 연동 지점 — 인증코드 검증
        // setLoading(true);
        // try {
        //     await verifyResetCodeApi({ email, code });
        //     setStep('reset');
        // } catch (err) {
        //     setCodeError(err.message || '인증코드가 올바르지 않습니다.');
        // } finally {
        //     setLoading(false);
        // }

        setStep('reset'); // 임시
    };

    const handleResetPassword = async () => {
        if (password.length < 8) {
            setPasswordError('비밀번호는 8자 이상이어야 합니다');
            return;
        }
        if (password !== passwordConfirm) {
            setPasswordError('비밀번호가 일치하지 않습니다');
            return;
        }
        setPasswordError('');

        // TODO: 👇 API 연동 지점 — 비밀번호 재설정
        // setLoading(true);
        // try {
        //     await resetPasswordApi({ email, code, password });
        //     onClose();
        // } catch (err) {
        //     setPasswordError(err.message || '비밀번호 재설정에 실패했습니다.');
        // } finally {
        //     setLoading(false);
        // }

        onClose(); // 임시
    };

    const handleBack = () => {
        if (step === 'code') setStep('email');
        else if (step === 'reset') setStep('code');
        else onClose();
    };

    const backLabel = {
        email: '← 로그인으로 돌아가기',
        code: '← 이메일 다시 입력',
        reset: '← 인증코드 다시 입력',
    }[step];

    return (
        <div
            className="forgot-password-modal"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="forgot-password-modal__dialog"
                onClick={(e) => e.stopPropagation()}
            >
                {step === 'email' && (
                    <>
                        <h2 className="forgot-password-modal__title">비밀번호 찾기</h2>
                        <p className="forgot-password-modal__subtitle">
                            가입한 이메일을 입력하세요.
                        </p>

                        <div className="forgot-password-modal__fields">
                            <FormField
                                id="forgot-email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                error={emailError}
                            />
                        </div>

                        <div className="forgot-password-modal__submit">
                            <Button
                                variant="primary"
                                onClick={handleSendEmail}
                                disabled={loading}
                            >
                                {loading ? '전송 중...' : '인증 메일 보내기'}
                            </Button>
                        </div>
                    </>
                )}

                {step === 'code' && (
                    <>
                        <h2 className="forgot-password-modal__title">인증코드 입력</h2>
                        <p className="forgot-password-modal__subtitle">
                            <strong>{email}</strong>로 전송된<br />
                            인증코드를 입력하세요.
                        </p>

                        <div className="forgot-password-modal__fields">
                            <FormField
                                id="forgot-code"
                                name="code"
                                type="text"
                                placeholder="인증코드 6자리"
                                maxLength={6}
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    setCodeError('');
                                }}
                                error={codeError}
                            />
                        </div>

                        <div className="forgot-password-modal__submit">
                            <Button
                                variant="primary"
                                onClick={handleVerifyCode}
                                disabled={loading}
                            >
                                {loading ? '확인 중...' : '확인'}
                            </Button>
                        </div>
                    </>
                )}

                {step === 'reset' && (
                    <>
                        <h2 className="forgot-password-modal__title">
                            비밀번호 재설정
                        </h2>
                        <p className="forgot-password-modal__subtitle">
                            새로운 비밀번호를 입력하세요.
                        </p>

                        <div className="forgot-password-modal__fields">
                            <FormField
                                id="forgot-new-password"
                                name="password"
                                label="새 비밀번호"
                                placeholder="••••••••"
                                isPassword
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError('');
                                }}
                            />

                            <FormField
                                id="forgot-password-confirm"
                                name="passwordConfirm"
                                label="비밀번호 확인"
                                placeholder="••••••••"
                                isPassword
                                value={passwordConfirm}
                                onChange={(e) => {
                                    setPasswordConfirm(e.target.value);
                                    setPasswordError('');
                                }}
                                error={passwordError}
                            />
                        </div>

                        <div className="forgot-password-modal__submit">
                            <Button
                                variant="primary"
                                onClick={handleResetPassword}
                                disabled={loading}
                            >
                                {loading ? '재설정 중...' : '비밀번호 재설정'}
                            </Button>
                        </div>
                    </>
                )}

                <div className="forgot-password-modal__footer">
                    <button
                        type="button"
                        className="forgot-password-modal__back"
                        onClick={handleBack}
                    >
                        {backLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
