import SectionHeader from '../SectionHeader/SectionHeader';
import FaqItem from '../FaqItem/FaqItem';
import './FaqList.css';

/**
 * items: [{ question, answer }, ...]
 * title, subtitle: SectionHeader에 그대로 전달
 */
export default function FaqList({
    items,
    eyebrow = '자주 묻는 질문',
    title,
    subtitle,
}) {
    return (
        <section className="faq-list">
            <div className="faq-list__inner">
                <SectionHeader
                    eyebrow={eyebrow}
                    title={title}
                    subtitle={subtitle}
                />
                <div className="faq-list__items">
                    {items.map(({ question, answer }) => (
                        <FaqItem key={question} question={question} answer={answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
