import { Link } from 'react-router-dom';
import './SiteFooter.css';

const FOOTER_LINKS = {
    제품: [
        { label: '기능', to: '/#features' },
        { label: '템플릿', to: '/#templates' },
        { label: '요금', to: '/pricing' },
        { label: '차트 갤러리', to: '/chart' },
    ],
    리소스: [
        { label: '도움말', href: '#' },
        { label: '블로그', href: '#' },
        { label: '튜토리얼', href: '#' },
        { label: '활용 사례', href: '#' },
    ],
    회사: [
        { label: '소개', href: '#' },
        { label: '채용', href: '#' },
        { label: '문의', href: '#' },
    ],
    약관: [
        { label: '이용약관', href: '#' },
        { label: '개인정보 처리방침', href: '#' },
        { label: '환불 정책', href: '#' },
    ],
};

export default function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__grid">
                    <div className="site-footer__brand">
                        <h4 className="site-footer__brand-name">MAC</h4>
                        <p className="site-footer__brand-desc">
                            CSV를 올리면 1분 만에 전문가 수준의 차트가 완성됩니다.
                        </p>
                    </div>

                    {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                        <div key={title} className="site-footer__col">
                            <h4 className="site-footer__col-title">{title}</h4>
                            <ul className="site-footer__col-list">
                                {links.map(({ label, to, href }) => (
                                    <li key={label} className="site-footer__col-item">
                                        {to ? (
                                            <Link to={to} className="site-footer__col-link">
                                                {label}
                                            </Link>
                                        ) : (
                                            <a href={href} className="site-footer__col-link">
                                                {label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="site-footer__bottom">
                    <p className="site-footer__legal">
                        (주)회사명 · 대표 홍길동 · 사업자등록번호 000-00-00000 ·
                        통신판매업 신고번호 0000-서울-0000<br />
                        서울특별시 ○○구 ○○로 00 · 이메일 hello@mac.kr · 전화 02-0000-0000
                    </p>
                </div>
            </div>
        </footer>
    );
}
