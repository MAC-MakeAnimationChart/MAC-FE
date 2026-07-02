import '../styles/auth.css'
import { SiteHeader, Button } from '../components/common'

export default function LoginPage() {
  return (
    <div className="auth-page">
      <SiteHeader />

      <div className="auth-main container">
        {/* LoginForm */}
        <section className="auth-form" aria-label="로그인">
          <h1 className="auth-form__title">다시 오신 것을 환영합니다</h1>
          <p className="auth-form__subtitle">계정에 로그인하고 작업을 이어가세요.</p>

          <form className="auth-form__fields" noValidate>
            <div className="field">
              <label className="field__label" htmlFor="email">이메일</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field field--password">
              <label className="field__label" htmlFor="password">비밀번호</label>
              <input
                className="input input--password"
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
              />
              <button type="button" className="input-toggle-lo" aria-label="비밀번호 보기">
                보기
              </button>
            </div>

            <div className="auth-form__row">
              <label className="checkbox">
                <input type="checkbox" name="remember" />
                <span>로그인 상태 유지</span>
              </label>
              <a href="#" className="auth-form__forgot">비밀번호를 잊으셨나요?</a>
            </div>

            {/* 구조 전환 단계: to="/chart"로 이동 (실제 인증 로직은 추후 추가) */}
            <Button
              variant="primary"
              size="lg"
              block
              to="/chart"
              className="auth-form__submit"
            >
              로그인
            </Button>
          </form>

          <p className="auth-form__alt">
            계정이 없으신가요? <a href="/signup">회원가입</a>
          </p>
        </section>

        {/* AuthVisual */}
        <aside className="auth-visual" aria-label="제품 소개">
          <div className="auth-visual__preview">
            제품 미리보기
          </div>

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
