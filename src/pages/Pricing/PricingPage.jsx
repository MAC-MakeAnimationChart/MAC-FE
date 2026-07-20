import './pricing.css';

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: '개인 테스트와 작은 리포트 제작에 적합합니다.',
    features: ['3 projects', 'CSV upload', 'PNG export'],
  },
  {
    name: 'Pro',
    price: '$12',
    desc: '반복적인 데이터 시각화 작업을 빠르게 처리합니다.',
    features: ['Unlimited projects', 'All chart types', 'SVG/PDF export'],
    featured: true,
  },
  {
    name: 'Team',
    price: '$39',
    desc: '여러 사람이 함께 템플릿과 결과물을 관리합니다.',
    features: ['Shared workspace', 'Team templates', 'Priority support'],
  },
];

export default function PricingPage() {
  return (
    <main className="pricing-page">
      <section className="pricing-page__hero">
        <p>Pricing</p>
        <h1>필요한 만큼 시작하고, 커질 때 확장하세요.</h1>
        <span>MAC Studio의 핵심 차트 제작 흐름을 팀 규모에 맞게 사용할 수 있습니다.</span>
      </section>

      <section className="pricing-page__grid">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`pricing-plan${plan.featured ? ' pricing-plan--featured' : ''}`}
          >
            {plan.featured && <span className="pricing-plan__badge">Popular</span>}
            <h2>{plan.name}</h2>
            <div className="pricing-plan__price">
              <strong>{plan.price}</strong>
              <span>/ month</span>
            </div>
            <p>{plan.desc}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button type="button">
              {plan.name === 'Free' ? 'Start free' : 'Choose plan'}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
