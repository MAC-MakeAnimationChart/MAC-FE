import { Link } from 'react-router-dom';
import './Button.css';

/**
 * variant: 'primary' | 'secondary' | 'ghost' | 'brand'
 *   - primary:   진한 인디고 배경
 *   - secondary: 흰 배경 + 회색 테두리
 *   - ghost:     투명 배경
 *   - brand:     흰 배경 + 오렌지 테두리, 호버 시 오렌지 배경 (템플릿 카드용)
 * size:    'lg' | undefined (기본 md)
 * block:   true  → .mac-button--block (풀 너비)
 * to:      React Router 경로 → <Link>로 렌더
 * href:    외부/앵커 URL → <a>로 렌더
 * (to/href 모두 없으면) → <button>으로 렌더
 *
 * 클래스 접두사가 'mac-button'인 이유:
 *  지침 3번에서 'button' 같은 단순한 클래스명 사용을 금지함.
 *  프로덕트명 'mac' 접두사를 붙여 충돌/모호성 방지.
 */
export default function Button({
    variant = 'primary',
    size,
    block = false,
    to,
    href,
    className = '',
    children,
    ...props
}) {
    const cls = [
        'mac-button',
        `mac-button--${variant}`,
        size === 'lg' && 'mac-button--lg',
        block && 'mac-button--block',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (to) {
        return (
            <Link to={to} className={cls} {...props}>
                {children}
            </Link>
        );
    }
    if (href) {
        return (
            <a href={href} className={cls} {...props}>
                {children}
            </a>
        );
    }
    return (
        <button className={cls} {...props}>
            {children}
        </button>
    );
}
