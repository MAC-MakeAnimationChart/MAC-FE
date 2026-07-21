import Button from '../Button/Button';
import './TemplateCard.css';

/**
 * 미리보기 SVG 3종.
 * previewType으로 어떤 그림을 그릴지 결정.
 *  - bar:   3개 세로 막대 + 오렌지 대각선 (성장 추이)
 *  - line:  얇은 곡선 + 강조 점
 *  - donut: 도넛 링 (구성비)
 */
function TemplateCardPreview({ previewType }) {
    if (previewType === 'line') {
        return (
            <svg
                className="template-card__preview-svg"
                viewBox="0 0 200 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M 20 70 Q 55 40, 90 55 T 180 35"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                />
                <circle cx="90" cy="55" r="4" fill="#FF6B35" />
            </svg>
        );
    }

    if (previewType === 'donut') {
        return (
            <svg
                className="template-card__preview-svg"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="32"
                    stroke="#E2E8F0"
                    strokeWidth="8"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="32"
                    stroke="#94A3B8"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="120 200"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>
        );
    }

    // 기본값: bar (막대 + 오렌지 대각선)
    return (
        <svg
            className="template-card__preview-svg"
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* 3개 세로 막대 */}
            <rect x="35" y="55" width="28" height="55" rx="3" fill="#DBEAFE" />
            <rect x="86" y="20" width="28" height="90" rx="3" fill="#4F46E5" />
            <rect x="137" y="40" width="28" height="70" rx="3" fill="#DBEAFE" />
            {/* 오렌지 대각선 (성장 추이) */}
            <line
                x1="40"
                y1="70"
                x2="165"
                y2="55"
                stroke="#FF6B35"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

/**
 * props:
 *  - category, title, desc
 *  - previewType: 'bar' | 'line' | 'donut' — 미리보기 SVG 종류
 *  - comingSoon: true면 '준비 중' 뱃지 + 비활성 CTA
 *  - ctaLabel, ctaTo: 활성 상태일 때만 사용
 */
export default function TemplateCard({
    category,
    title,
    desc,
    previewType = 'bar',
    comingSoon = false,
    ctaLabel = '이 템플릿 사용하기',
    ctaTo = '#',
}) {
    return (
        <article
            className={`template-card${comingSoon ? ' template-card--coming-soon' : ''}`}
        >
            <div className="template-card__preview">
                <TemplateCardPreview previewType={previewType} />
            </div>

            <div className="template-card__body">
                <p className="template-card__category">{category}</p>
                <h3 className="template-card__title">{title}</h3>
                <p className="template-card__desc">{desc}</p>

                <div className="template-card__cta">
                    {comingSoon ? (
                        <button
                            type="button"
                            className="template-card__cta-disabled"
                            disabled
                        >
                            준비 중
                        </button>
                    ) : (
                        <Button variant="brand" block to={ctaTo}>
                            {ctaLabel}
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}
