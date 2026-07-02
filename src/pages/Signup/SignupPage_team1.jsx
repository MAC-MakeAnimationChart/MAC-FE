import '../styles/auth.css'
import { SiteHeader, Button } from '../components/common'

export default function SignupPage() {
  return (
    <div className="auth-page">
      <SiteHeader />

      <div className="auth-main container">
        {/* SignupForm */}
        <section className="auth-form" aria-label="회원가입">
          <h1 className="auth-form__title">계정 만들기</h1>
          <p className="auth-form__subtitle">
            30초면 충분합니다. 신용카드도 필요 없어요.
          </p>

          <form className="auth-form__fields" noValidate>
            <div className="field field--with-action">
              <label className="field__label" htmlFor="signup-email">이메일</label>
              <input
                className="input"
                type="email"
                id="signup-email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
              <p className="field__hint">로그인과 알림 수신에 사용됩니다</p>
            </div>

            <div className="field field--password">
              <label className="field__label" htmlFor="signup-password">비밀번호</label>
              <input
                className="input input--password"
                type="password"
                id="signup-password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
              />
              <button type="button" className="input-toggle" aria-label="비밀번호 보기">
                보기
              </button>
              <p className="field__hint">영문, 숫자, 특수문자 포함 8자 이상</p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="name">이름</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="홍길동"
                autoComplete="name"
                required
              />
            </div>

            {/* Agreements */}
            <div className="agreements">
              <label className="checkbox agreements__all">
                <input type="checkbox" />
                <span>전체 동의</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" required />
                <span>만 14세 이상입니다 (필수)</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" required />
                <span><a href="#">이용약관</a> 동의 (필수)</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" required />
                <span><a href="#">개인정보 처리방침</a> 동의 (필수)</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" />
                <span>마케팅 정보 수신 동의 (선택)</span>
              </label>
            </div>

            {/* 구조 전환 단계: to="/chart"로 이동 (실제 인증 로직은 추후 추가) */}
            <Button
              variant="primary"
              size="lg"
              block
              to="/chart"
              className="auth-form__submit"
            >
              계정 만들기
            </Button>
            <p className="auth-form__hint">가입 시 인증 메일이 발송됩니다</p>
          </form>

          <p className="auth-form__alt">
            이미 계정이 있으신가요? <a href="/login">로그인</a>
          </p>
        </section>

        {/* AuthVisual */}
        <aside className="auth-visual" aria-label="제품 소개">
          <div className="auth-visual__preview">제품 미리보기</div>

          <p className="auth-visual__quote">
            "CSV를 올리면 1분 만에<br />발표용 차트가 완성됩니다."
          </p>

          <ul className="auth-visual__benefits">
            <li className="benefit">
              <span className="benefit__check" aria-hidden="true">✓</span>
              <span>한글 폰트와 컬러가 자동으로 최적화됩니다</span>
            </li>
            <li className="benefit">
              <span className="benefit__check" aria-hidden="true">✓</span>
              <span>8가지 차트 유형을 데이터에 맞게 추천합니다</span>
            </li>
            <li className="benefit">
              <span className="benefit__check" aria-hidden="true">✓</span>
              <span>PNG, SVG, URL 공유까지 한번에</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
