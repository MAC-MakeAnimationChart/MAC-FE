import { Link } from 'react-router-dom';
import './SignupPage.css';

export default function SignupPage() {
    return (
        <div className="sg-container">
            <div className="sg-card">
                <div className="sg-card-header">
                    <h2 className="sg-title">MAC 워크스페이스 생성</h2>
                    <p className="sg-subtitle">간편 가입으로 무제한 데이터 정제 시스템을 이용하세요.</p>
                </div>

                {/* 상호작용: 가입 폼 */}
                <form className="sg-form" onSubmit={/* 회원가입 API 주석 */ (e) => e.preventDefault()}>
                    <div className="sg-input-block">
                        <label className="sg-label">이름</label>
                        <input type="text" className="sg-input" placeholder="홍길동" required />
                    </div>
                    <div className="sg-input-block">
                        <label className="sg-label">워크스페이스 이메일</label>
                        <input type="email" className="sg-input" placeholder="user@company.com" required />
                    </div>
                    <div className="sg-input-block">
                        <label className="sg-label">비밀번호 설정</label>
                        <input type="password" className="sg-input" placeholder="8자 이상의 영문 숫자 조합" required />
                    </div>
                    <button type="submit" className="sg-btn-submit">무료 계정 생성</button>
                </form>

                <div className="sg-card-footer">
                    <span>이미 워크스페이스가 있나요?</span>
                    <Link to="/login" className="sg-link-login">로그인</Link>
                </div>
            </div>
        </div>
    );
}
