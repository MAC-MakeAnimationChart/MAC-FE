import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './SiteHeader.css';

// 노션 디자인 기준 네비게이션
// 앵커(#)는 랜딩 내 섹션, 라우트(/pricing 등)는 실제 페이지
const NAV_LINKS = [
    { label: '제품', to: '/' },
    { label: '차트 갤러리', to: '/studio' },
    { label: '템플릿', to: '/#templates' },
    { label: '활용 사례', to: '/#cases' },
    { label: '요금', to: '/pricing' },
];

export default function SiteHeader() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link to="/" className="site-header__logo">MAC</Link>

                <nav className="site-header__nav" aria-label="주요 메뉴">
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link key={label} to={to} className="site-header__nav-link">
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="site-header__actions">
                    <Button variant="ghost" to="/login">로그인</Button>
                    <Button variant="primary" to="/signup">무료로 시작하기</Button>
                </div>
            </div>
        </header>
    );
}
