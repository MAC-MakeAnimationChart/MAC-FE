import Button from '../Button/Button';
import './PlanCard.css';

/**
 * props:
 *  - name, tagline, features (배열)
 *  - amount (월간 가격), yearlyAmount (연간 가격), period
 *  - billing: 'monthly' | 'yearly' — 어느 가격을 표시할지
 *  - cta: { label, variant, to }
 *  - featured: boolean — 강조 카드 스타일
 *  - badge: string — 상단 뱃지 텍스트 (예: '가장 인기')
 */
export default function PlanCard({
    name,
    tagline,
    features,
    amount,
    yearlyAmount,
    period,
    billing,
    cta,
    featured,
    badge,
}) {
    const displayAmount = billing === 'yearly' ? yearlyAmount : amount;

    return (
        <article
            className={`plan-card${featured ? ' plan-card--featured' : ''}`}
        >
            {badge && <span className="plan-card__badge">{badge}</span>}

            <p className="plan-card__name">{name}</p>

            <div className="plan-card__price">
                <span className="plan-card__price-amount">{displayAmount}</span>
                {period && (
                    <span className="plan-card__price-period">{period}</span>
                )}
            </div>

            <p className="plan-card__tagline">{tagline}</p>

            <Button
                variant={cta.variant}
                block
                to={cta.to}
                className="plan-card__cta"
            >
                {cta.label}
            </Button>

            <ul className="plan-card__features">
                {features.map((feat) => (
                    <li key={feat} className="plan-card__feature">
                        <span
                            className="plan-card__feature-check"
                            aria-hidden="true"
                        >
                            ✓
                        </span>
                        <span className="plan-card__feature-text">{feat}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
