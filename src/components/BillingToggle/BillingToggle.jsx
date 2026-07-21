import './BillingToggle.css';

/**
 * props:
 *  - value: 'monthly' | 'yearly'
 *  - onChange: (next) => void
 */
export default function BillingToggle({ value, onChange }) {
    return (
        <div
            className={`billing-toggle billing-toggle--${value}`}
            role="tablist"
        >
            <span className="billing-toggle__thumb" aria-hidden="true" />

            <button
                type="button"
                className="billing-toggle__btn"
                role="tab"
                aria-selected={value === 'monthly'}
                onClick={() => onChange('monthly')}
            >
                월간 결제
            </button>
            <button
                type="button"
                className="billing-toggle__btn"
                role="tab"
                aria-selected={value === 'yearly'}
                onClick={() => onChange('yearly')}
            >
                연간 결제
            </button>
        </div>
    );
}
