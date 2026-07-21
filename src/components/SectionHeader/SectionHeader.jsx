import './SectionHeader.css';

export default function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <div className="section-header">
            {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
            <h2 className="section-header__title">{title}</h2>
            {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
        </div>
    );
}
