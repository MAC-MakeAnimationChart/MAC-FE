import '../styles/pricing.css'
import { SiteHeader, SiteFooter, Button, FAQItem } from '../components/common'

const PLANS = [
  {
    name: 'Free',
    amount: '₩0',
    period: null,
    tagline: '개인 체험용으로 충분',
    cta: { label: '무료로 시작', to: '/signup', variant: 'secondary' },
    features: ['프로젝트 3개', '파일 크기 5MB', 'PNG 내보내기', '커뮤니티 지원'],
    featured: false,
    badge: null,
  },
  {
    name: 'Pro',
    amount: '₩9,900',
    period: '/월',
    tagline: '개인 프로 사용자에게',
    cta: { label: '14일 무료 체험', to: '/signup', variant: 'primary' },
    features: [
      '프로젝트 무제한',
      '파일 크기 50MB',
      'PNG, SVG, PDF 내보내기',
      '워터마크 제거',
      '이메일 지원',
    ],
    featured: true,
    badge: '가장 인기',
  },
  {
    name: 'Team',
    amount: '₩29,000',
    period: '/월 · 인',
    tagline: '팀 협업에 최적화',
    cta: { label: '팀으로 시작', to: '/signup', variant: 'secondary' },
    features: [
      'Pro 기능 전체 포함',
      '멤버 초대 및 공동 편집',
      'URL 공유 · 임베드',
      '팀 템플릿 라이브러리',
      '우선 지원',
    ],
    featured: false,
    badge: null,
  },
  {
    name: 'Enterprise',
    amount: '맞춤',
    period: null,
    tagline: '대규모 조직을 위한',
    cta: { label: '영업팀 문의', href: '#', variant: 'secondary' },
    features: [
      'Team 기능 전체 포함',
      'SSO 및 권한 관리',
      'API 액세스',
      '전담 매니저 · SLA',
      '맞춤 보안 검토',
    ],
    featured: false,
    badge: null,
  },
]

const PRICING_FAQS = [
  {
    question: '플랜은 언제든 변경할 수 있나요?',
    answer:
      '네, 언제든 업그레이드 또는 다운그레이드가 가능합니다. 변경 시점에 따라 요금이 일할 계산됩니다.',
  },
  {
    question: '세금계산서를 발급받을 수 있나요?',
    answer:
      'Pro 이상의 플랜에서 세금계산서를 발급해드립니다. 결제 후 사업자 정보를 등록하면 매월 자동으로 발급됩니다.',
  },
  {
    question: '환불 정책은 어떻게 되나요?',
    answer:
      '결제 후 14일 이내에는 사유 없이 전액 환불해드립니다. 그 이후에는 미사용 기간에 대한 비례 환불이 가능합니다.',
  },
  {
    question: '연간 결제 시 얼마나 할인되나요?',
    answer: '월간 결제 대비 약 20% 할인됩니다. 두 달 무료라고 생각하시면 됩니다.',
  },
  {
    question: '업로드한 데이터는 어떻게 보호되나요?',
    answer:
      '모든 데이터는 전송과 저장 시 암호화됩니다. 계정 삭제 시 즉시 영구 삭제되며, 백업본은 30일 이내 자동 삭제됩니다.',
  },
]

// ✓ 셀과 — 셀을 구분하는 헬퍼
function CompCell({ value }) {
  const isCheck = value === '✓'
  return (
    <td className={`comparison__value${isCheck ? ' comparison__value--check' : ''}`}>
      {value}
    </td>
  )
}

export default function PricingPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Pricing Hero */}
        <section className="pricing-hero">
          <div className="container">
            <h1 className="pricing-hero__title">데이터에 맞는 플랜을 선택하세요</h1>
            <p className="pricing-hero__subtitle">
              무료로 시작하고 필요할 때 업그레이드하세요. 언제든 변경하고 환불할 수 있습니다.
            </p>

            {/* BillingToggle — JS 인터랙션은 추후 추가 */}
            <div className="billing-toggle" role="tablist">
              <button
                className="billing-toggle__btn billing-toggle__btn--active"
                role="tab"
                aria-selected="true"
              >
                월간 결제
              </button>
              <button
                className="billing-toggle__btn"
                role="tab"
                aria-selected="false"
              >
                연간 결제
                <span className="billing-toggle__badge">20% 할인</span>
              </button>
            </div>
          </div>
        </section>

        {/* Plan Grid */}
        <section className="plans">
          <div className="container">
            <div className="plans__grid">
              {PLANS.map(({ name, amount, period, tagline, cta, features, featured, badge }) => (
                <article
                  key={name}
                  className={`plan-card${featured ? ' plan-card--featured' : ''}`}
                >
                  {badge && <span className="plan-card__badge">{badge}</span>}
                  <p className="plan-card__name">{name}</p>
                  <div className="plan-card__price">
                    <span className="plan-card__price-amount">{amount}</span>
                    {period && <span className="plan-card__price-period">{period}</span>}
                  </div>
                  <p className="plan-card__tagline">{tagline}</p>
                  <Button
                    variant={cta.variant}
                    block
                    to={cta.to}
                    href={cta.href}
                    className="plan-card__cta"
                  >
                    {cta.label}
                  </Button>
                  <ul className="plan-card__features">
                    {features.map((feat) => (
                      <li key={feat} className="plan-card__feature">
                        <span className="plan-card__feature-check" aria-hidden="true">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="comparison">
          <div className="container">
            <div className="section-header">
              <h2 className="section-header__title">전체 기능 비교</h2>
              <p className="section-header__subtitle">각 플랜이 제공하는 기능을 상세히 확인하세요.</p>
            </div>

            <table className="comparison__table">
              <thead>
                <tr>
                  <th></th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Team</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="comparison__category" colSpan={5}>시각화</td>
                </tr>
                <tr>
                  <td className="comparison__feature-name">프로젝트 수</td>
                  <CompCell value="3개" />
                  <CompCell value="무제한" />
                  <CompCell value="무제한" />
                  <CompCell value="무제한" />
                </tr>
                <tr>
                  <td className="comparison__feature-name">파일 크기</td>
                  <CompCell value="5 MB" />
                  <CompCell value="50 MB" />
                  <CompCell value="200 MB" />
                  <CompCell value="맞춤" />
                </tr>
                <tr>
                  <td className="comparison__feature-name">차트 유형</td>
                  <CompCell value="8종" />
                  <CompCell value="8종" />
                  <CompCell value="8종 + 커스텀" />
                  <CompCell value="전체" />
                </tr>

                <tr>
                  <td className="comparison__category" colSpan={5}>내보내기</td>
                </tr>
                <tr>
                  <td className="comparison__feature-name">PNG</td>
                  <CompCell value="✓" />
                  <CompCell value="✓" />
                  <CompCell value="✓" />
                  <CompCell value="✓" />
                </tr>
                <tr>
                  <td className="comparison__feature-name">SVG · PDF</td>
                  <CompCell value="—" />
                  <CompCell value="✓" />
                  <CompCell value="✓" />
                  <CompCell value="✓" />
                </tr>
                <tr>
                  <td className="comparison__feature-name">URL 공유 · 임베드</td>
                  <CompCell value="—" />
                  <CompCell value="—" />
                  <CompCell value="✓" />
                  <CompCell value="✓" />
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Info */}
        <section className="payment-info">
          <div className="container">
            <div className="payment-info__grid">
              <div className="info-card">
                <h3 className="info-card__title">결제 수단</h3>
                <p className="info-card__desc">
                  국내 주요 결제 수단을 모두 지원합니다. 부가세(VAT)는 별도입니다.
                </p>
                <div className="info-card__items">
                  {['신용/체크카드', '카카오페이', '네이버페이', '계좌이체', '법인카드'].map((m) => (
                    <span key={m} className="info-card__chip">{m}</span>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h3 className="info-card__title">환불</h3>
                <p className="info-card__desc">
                  14일 이전까지 환불 보장을 제공합니다.
                </p>
                <div className="info-card__items">
                  {['14일 환불', '언제든 해지'].map((m) => (
                    <span key={m} className="info-card__chip">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">자주 묻는 질문</p>
              <h2 className="section-header__title">결제 관련 궁금한 점</h2>
            </div>
            <div className="faq__list">
              {PRICING_FAQS.map(({ question, answer }) => (
                <FAQItem key={question} question={question} answer={answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="container">
            <h2 className="final-cta__title">아직 결정이 어려우신가요?</h2>
            <p className="final-cta__subtitle">
              무료로 먼저 사용해보거나 영업팀과 상담해보세요.
            </p>
            <div className="final-cta__actions">
              <Button variant="primary" size="lg" to="/signup">무료로 시작</Button>
              <Button variant="secondary" size="lg" href="#">영업팀 상담</Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
