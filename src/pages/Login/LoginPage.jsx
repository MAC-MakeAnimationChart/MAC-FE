import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
    return (
        <div className="lg-container">
            <div className="lg-card">
                <div className="lg-card-header">
                    <Link to="/" className="lg-brand-logo">MAC</Link>
                    <h2 className="lg-title">시각화 스튜디오 로그인</h2>
                </div>

                {/* 상호작용: 서브밋 제어 */}
                <form className="lg-form" onSubmit={/* 로그인 API 연동 주석 */ (e) => e.preventDefault()}>
                    <div className="lg-input-block">
                        <label className="lg-label">이메일 계정</label>
                        <input type="email" className="lg-input" placeholder="name@company.com" required />
                    </div>
                    <div className="lg-input-block">
                        <label className="lg-label">비밀번호</label>
                        <input type="password" className="lg-input" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="lg-btn-submit">로그인인</button>
                </form>

                <div className="lg-card-footer">
                    <span>아직 계정이 없으신가요?</span>
                    <Link to="/signup" className="lg-link-signup">무료 회원가입</Link>
                </div>
            </div>
        </div>
    );
}
