import './PaymentInfo.css';

const PAYMENT_METHODS = [
    '신용/체크카드',
    '카카오페이',
    '네이버페이',
    '계좌이체',
    '법인카드',
];

const REFUND_ITEMS = ['7일 환불', '언제든 해지'];

export default function PaymentInfo() {
    return (
        <section className="payment-info">
            <div className="payment-info__inner">
                <div className="payment-info__grid">
                    <div className="payment-info-card">
                        <h3 className="payment-info-card__title">결제 수단</h3>
                        <p className="payment-info-card__desc">
                            국내 주요 결제 수단을 모두 지원합니다. 부가세(VAT)는 별도입니다.
                        </p>
                        <div className="payment-info-card__items">
                            {PAYMENT_METHODS.map((m) => (
                                <span
                                    key={m}
                                    className="payment-info-card__chip"
                                >
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="payment-info-card">
                        <h3 className="payment-info-card__title">환불</h3>
                        <p className="payment-info-card__desc">
                            7일 이전까지 환불 보장을 제공합니다.
                        </p>
                        <div className="payment-info-card__items">
                            {REFUND_ITEMS.map((m) => (
                                <span
                                    key={m}
                                    className="payment-info-card__chip"
                                >
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
