import './FaqItem.css';

export default function FaqItem({ question, answer }) {
    return (
        <details className="faq-item">
            <summary className="faq-item__question">
                <span className="faq-item__question-text">{question}</span>
                <span className="faq-item__icon" aria-hidden="true">+</span>
            </summary>
            <p className="faq-item__answer">{answer}</p>
        </details>
    );
}
