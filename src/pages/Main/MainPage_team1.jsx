import '../styles/landing.css'
// plan-card 스타일은 pricing.css에 정의됨 — PricingPreview 섹션에서 재사용
import '../styles/pricing.css'
import { SiteHeader, SiteFooter, Button, FAQItem } from '../components/common'

const FEATURES = [
  {
    title: '한글 데이터 자동 인식',
    desc: '엑셀의 한글 깨짐 걱정 없이 깔끔하게. 한글 폰트와 컬러 팔레트가 자동으로 최적화됩니다.',
  },
  {
    title: '차트 자동 추천',
    desc: '데이터의 형태를 분석해 어울리는 차트를 제안합니다. 막대, 선, 도넛, 영역 차트까지 한번에.',
  },
  {
    title: '발표용 고화질 내보내기',
    desc: 'PNG, SVG, URL 공유, 임베드까지. 발표 자료에 바로 쓸 수 있는 결과물을 만듭니다.',
  },
]

const STEPS = [
  { number: 1, title: '파일 업로드', desc: 'CSV 또는 엑셀 파일을 드래그해서 올립니다.' },
  { number: 2, title: '데이터 확인', desc: '자동 인식된 열 제목과 형식을 점검합니다.' },
  { number: 3, title: '차트 선택', desc: '목적에 맞는 차트를 추천 중에서 고릅니다.' },
  { number: 4, title: '편집 · 내보내기', desc: '색상과 라벨을 다듬어 PNG, SVG로 저장합니다.' },
]

const DIFFS = [
  {
    vs: 'vs 엑셀',
    title: '1분 완성',
    desc: '차트 설정에 시간을 쓰지 않습니다. 업로드하면 끝.',
  },
  {
    vs: 'vs Tableau',
    title: '학습 비용 0',
    desc: '튜토리얼 없이 누구나 바로 사용할 수 있는 인터페이스.',
  },
  {
    vs: 'vs Datawrapper',
    title: '한글 완벽 지원',
    desc: '한글 폰트, 한국식 데이터 형식, 한국어 인터페이스.',
  },
]

const TESTIMONIALS = [
  {
    quote: '"주간 보고서 만드는 시간이 두 시간에서 십 분으로 줄었습니다. 팀원들도 전부 쓰고 있어요."',
    name: '김민수',
    role: '마케팅 매니저 · A사',
  },
  {
    quote: '"학생들에게 시각화 결과물을 빠르게 보여줄 수 있어서 수업 준비가 훨씬 수월해졌습니다."',
    name: '이지원',
    role: '고등학교 교사',
  },
  {
    quote: '"학원 운영 데이터를 한 곳에 모아 보니까 의사결정이 훨씬 빨라졌어요."',
    name: '박서영',
    role: '학원 원장',
  },
]

const PREVIEW_PLANS = [
  {
    name: 'Free',
    amount: '₩0',
    period: null,
    tagline: '개인 체험용',
    cta: '무료 시작',
    featured: false,
  },
  {
    name: 'Pro',
    amount: '₩9,900',
    period: '/월',
    tagline: '개인 프로 사용자',
    cta: '14일 무료 체험',
    featured: true,
  },
  {
    name: 'Team',
    amount: '₩29,000',
    period: '/월·인',
    tagline: '팀 협업용',
    cta: '팀 시작하기',
    featured: false,
  },
]

const LANDING_FAQS = [
  {
    question: '업로드한 데이터는 안전한가요?',
    answer:
      '모든 데이터는 암호화되어 저장되며, 사용자 본인만 접근할 수 있습니다. 자세한 사항은 개인정보 처리방침을 참고하세요.',
  },
  {
    question: '무료 플랜의 제한은 무엇인가요?',
    answer:
      '무료 플랜은 프로젝트 3개, 파일 크기 5MB, PNG 내보내기까지 제공합니다. 더 큰 파일이나 다른 포맷이 필요하면 Pro 플랜을 고려해보세요.',
  },
  {
    question: '팀원과 함께 작업할 수 있나요?',
    answer:
      'Team 플랜부터 멤버 초대와 공동 편집이 가능합니다. Enterprise 플랜에서는 SSO와 권한 관리도 지원합니다.',
  },
  {
    question: '결제 후 환불이 가능한가요?',
    answer: '결제 후 14일 이내 환불을 보장합니다. 별도의 사유 없이 신청 가능합니다.',
  },
]

export default function LandingPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <span className="hero__eyebrow">새로운 시각화 경험</span>
              <h1 className="hero__title">
                데이터를 차트로,<br />바로 완성하세요
              </h1>
              <p className="hero__subtitle">
                CSV와 엑셀 파일을 올리면 차트 초안이 즉시 만들어집니다.<br />
                색상, 라벨, 축을 다듬고 발표용 결과물로 내보내세요.
              </p>
              <div className="hero__actions">
                <Button variant="primary" size="lg" to="/signup">회원가입</Button>
                <Button variant="secondary" size="lg" to="/login">로그인</Button>
              </div>
              <p className="hero__note">신용카드 필요 없음 · 1분 만에 시작</p>
            </div>

            <div className="hero__visual" aria-label="제품 데모 영상">
              제품 데모 영상 영역
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features" id="features">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">핵심 기능</p>
              <h2 className="section-header__title">한국 사용자를 위해 만들어졌습니다</h2>
              <p className="section-header__subtitle">
                엑셀 한글 깨짐, 발표용 퀄리티, 빠른 작업까지 — 데이터 시각화에 필요한 모든 것
              </p>
            </div>

            <div className="features__grid">
              {FEATURES.map(({ title, desc }) => (
                <article key={title} className="feature-card">
                  <div className="feature-card__icon" aria-hidden="true" />
                  <h3 className="feature-card__title">{title}</h3>
                  <p className="feature-card__desc">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">작동 방식</p>
              <h2 className="section-header__title">파일 하나로 차트 완성</h2>
              <p className="section-header__subtitle">
                네 단계면 충분합니다. 별도의 학습 비용 없이 바로 시작하세요.
              </p>
            </div>

            <ol className="how__steps">
              {STEPS.map(({ number, title, desc }) => (
                <li key={number} className="step">
                  <span className="step__number" aria-hidden="true">{number}</span>
                  <h3 className="step__title">{title}</h3>
                  <p className="step__desc">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Differentiation */}
        <section className="differentiation">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">차별점</p>
              <h2 className="section-header__title">왜 MAC일까요</h2>
            </div>

            <div className="diff-grid">
              {DIFFS.map(({ vs, title, desc }) => (
                <article key={vs} className="diff-card">
                  <p className="diff-card__vs">{vs}</p>
                  <h3 className="diff-card__title">{title}</h3>
                  <p className="diff-card__desc">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">사용자 후기</p>
              <h2 className="section-header__title">실제로 이렇게 쓰고 있습니다</h2>
            </div>

            <div className="testimonials__grid">
              {TESTIMONIALS.map(({ quote, name, role }) => (
                <article key={name} className="testimonial">
                  <p className="testimonial__quote">{quote}</p>
                  <div className="testimonial__author">
                    <div className="testimonial__avatar" aria-hidden="true" />
                    <div>
                      <p className="testimonial__name">{name}</p>
                      <p className="testimonial__role">{role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="pricing-preview">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">요금제</p>
              <h2 className="section-header__title">필요에 맞는 플랜을 고르세요</h2>
              <p className="section-header__subtitle">무료로 시작하고 필요한 만큼만 확장하세요.</p>
            </div>

            <div className="pricing-preview__grid">
              {PREVIEW_PLANS.map(({ name, amount, period, tagline, cta, featured }) => (
                <div
                  key={name}
                  className={`plan-card${featured ? ' plan-card--featured' : ''}`}
                >
                  <p className="plan-card__name">{name}</p>
                  <div className="plan-card__price">
                    <span className="plan-card__price-amount">{amount}</span>
                    {period && <span className="plan-card__price-period">{period}</span>}
                  </div>
                  <p className="plan-card__tagline">{tagline}</p>
                  <Button variant="secondary" block to="/signup" className="plan-card__cta">
                    {cta}
                  </Button>
                </div>
              ))}
            </div>

            <div className="pricing-preview__cta">
              <Button variant="ghost" to="/pricing">전체 플랜 비교 →</Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="container">
            <div className="section-header">
              <p className="section-header__eyebrow">자주 묻는 질문</p>
              <h2 className="section-header__title">궁금한 점이 있으신가요</h2>
            </div>
            <div className="faq__list">
              {LANDING_FAQS.map(({ question, answer }) => (
                <FAQItem key={question} question={question} answer={answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="container">
            <h2 className="final-cta__title">지금 바로 시작해보세요</h2>
            <p className="final-cta__subtitle">무료로 사용할 수 있습니다. 신용카드가 필요 없습니다.</p>
            <div className="final-cta__actions">
              <Button variant="primary" size="lg" to="/signup">무료로 시작하기</Button>
              <Button variant="secondary" size="lg" href="#demo">샘플로 체험</Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
