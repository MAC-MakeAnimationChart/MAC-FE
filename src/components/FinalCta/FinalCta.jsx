import Button from '../Button/Button';
import './FinalCta.css';

/**
 * props:
 *  - title, subtitle: 상단 카피
 *  - primaryLabel, primaryTo: 주 CTA
 *  - secondaryLabel, secondaryTo/secondaryHref: 부 CTA (선택)
 */
export default function FinalCta({
    title,
    subtitle,
    primaryLabel,
    primaryTo,
    secondaryLabel,
    secondaryTo,
    secondaryHref,
}) {
    return (
        <section className="final-cta">
            <div className="final-cta__inner">
                <h2 className="final-cta__title">{title}</h2>
                {subtitle && <p className="final-cta__subtitle">{subtitle}</p>}

                <div className="final-cta__actions">
                    <Button variant="primary" size="lg" to={primaryTo}>
                        {primaryLabel}
                    </Button>
                    {secondaryLabel && (
                        <Button
                            variant="secondary"
                            size="lg"
                            to={secondaryTo}
                            href={secondaryHref}
                        >
                            {secondaryLabel}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}
