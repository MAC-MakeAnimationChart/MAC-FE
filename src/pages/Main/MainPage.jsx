import { Link, useNavigate } from 'react-router-dom';

function PublicHeader() {
  return (
    <header className="glass h-16 flex items-center justify-between px-6 md:px-12 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-[22px] font-black tracking-tighter" style={{ color: '#0F172A' }}>
          MAC
        </Link>
        <nav className="hidden md:flex gap-7 text-sm font-semibold" style={{ color: '#64748B' }}>
          <a href="#product" className="hover:text-slate-900 transition-colors">제품</a>
          <Link to="/workspace/charts" className="hover:text-slate-900 transition-colors">차트 갤러리</Link>
          <Link to="/workspace/templates" className="hover:text-slate-900 transition-colors">템플릿</Link>
          <a href="#usecase" className="hover:text-slate-900 transition-colors">활용 사례</a>
          <Link to="/pricing" className="hover:text-slate-900 transition-colors">요금</Link>
        </nav>
      </div>
      <div className="flex items-center gap-5 text-sm font-semibold">
        <Link to="/login" className="transition-colors" style={{ color: '#64748B' }}>로그인</Link>
        <Link
          to="/signup"
          className="text-white px-5 py-2.5 rounded-full transition-all duration-300 text-sm shadow-sm"
          style={{ background: '#0F172A' }}
        >
          무료로 시작하기
        </Link>
      </div>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 py-8 px-6 md:px-12" style={{ background: '#fff' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-xs font-semibold" style={{ color: '#94A3B8' }}>
          © {new Date().getFullYear()} MAC · Make Animation Chart
        </span>
        <div className="flex gap-5 text-xs font-bold" style={{ color: '#64748B' }}>
          <Link to="/pricing">요금</Link>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </footer>
  );
}

export default function MainPage() {
  const navigate = useNavigate();

  function runSampleDemo() {
    navigate('/studio');
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />

      <main className="flex-1 w-full bg-white">
        {/* ━━━━━━━━━━ Hero ━━━━━━━━━━ */}
        <div className="relative overflow-hidden bg-white">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'rgba(79,70,229,0.03)', transform: 'translate(33%, -50%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,107,53,0.04)', transform: 'translate(-25%, 50%)' }}
          />

          <div className="container mx-auto px-6 lg:px-12 pt-24 pb-28 flex flex-col lg:flex-row items-center gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-full mb-6 fade-up du1"
                style={{ background: 'rgba(79,70,229,0.10)', color: '#4F46E5' }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ background: '#4F46E5' }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#4F46E5' }} />
                </span>
                새로운 시각화 경험
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-[58px] lg:leading-[1.12] font-black mb-6 fade-up du2"
                style={{ color: '#0F172A' }}
              >
                데이터를 차트로,
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #4F46E5, #FF6B35)' }}
                >
                  바로 완성하세요.
                </span>
              </h1>
              <p
                className="text-lg mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed fade-up du3"
                style={{ color: '#64748B' }}
              >
                CSV와 엑셀 파일을 올리면 차트 초안이 바로 만들어집니다.
                <br />
                색상, 라벨, 축을 직접 다듬고 발표용 결과물로 내보내세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-up du4">
                <Link
                  to="/signup"
                  className="text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg text-base inline-flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  style={{ background: '#FF6B35', boxShadow: '0 8px 24px rgba(255,107,53,0.28)' }}
                >
                  무료로 시작하기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={runSampleDemo}
                  className="bg-white border-2 font-bold px-8 py-4 rounded-full transition-all duration-300 text-base inline-flex items-center gap-2"
                  style={{ borderColor: '#E2E8F0', color: '#334155' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#4F46E5' }}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  샘플 데이터로 체험
                </button>
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="flex-1 relative w-full max-w-xl z-10">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px -10px rgba(148,163,184,0.35)' }}
              >
                <div
                  className="h-10 flex items-center px-4 gap-2"
                  style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
                  <span className="mx-auto text-xs font-semibold" style={{ color: '#94A3B8' }}>
                    Q4_Revenue_Report.csv
                  </span>
                </div>
                <div className="p-8 bg-white relative">
                  <div className="flex gap-5 mb-5 text-sm font-bold pb-3" style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <span
                      className="pb-3 -mb-[14px]"
                      style={{ color: '#4F46E5', borderBottom: '2px solid #4F46E5' }}
                    >
                      데이터 시각화
                    </span>
                    <span style={{ color: '#94A3B8' }}>스타일 편집</span>
                  </div>
                  <div className="flex items-end justify-around h-48 px-2 pb-6 relative">
                    <div className="absolute inset-0 flex flex-col justify-between py-4" style={{ zIndex: -1 }}>
                      <div className="w-full" style={{ borderTop: '1px dashed #F1F5F9' }} />
                      <div className="w-full" style={{ borderTop: '1px dashed #F1F5F9' }} />
                      <div className="w-full" style={{ borderTop: '1px dashed #F1F5F9' }} />
                      <div className="w-full" style={{ borderTop: '1px solid #E2E8F0' }} />
                    </div>
                    <div className="w-12 rounded-t-lg bar-anim d1 opacity-0" style={{ height: '38%', background: '#DBEAFE' }} />
                    <div
                      className="w-12 rounded-t-lg bar-anim d2 opacity-0"
                      style={{ height: '66%', background: '#4F46E5', boxShadow: '0 8px 20px rgba(79,70,229,0.2)' }}
                    />
                    <div className="w-12 rounded-t-lg bar-anim d3 opacity-0" style={{ height: '50%', background: '#C7D2FE' }} />
                    <div
                      className="w-12 rounded-t-lg bar-anim d4 opacity-0"
                      style={{ height: '88%', background: '#FF6B35', boxShadow: '0 8px 20px rgba(255,107,53,0.2)' }}
                    />
                  </div>
                  <div className="flex justify-around px-2 text-xs font-bold mt-1" style={{ color: '#94A3B8' }}>
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span style={{ color: '#FF6B35' }}>Q4</span>
                  </div>
                  <div
                    className="absolute top-14 left-3 p-3 rounded-xl floating"
                    style={{ background: '#fff', boxShadow: '0 12px 24px rgba(15,23,42,0.10)', border: '1px solid #E2E8F0' }}
                  >
                    <div
                      className="w-10 h-10 rounded-full mb-2"
                      style={{
                        border: '4px solid #F1F5F9',
                        borderTopColor: '#FF6B35',
                        borderRightColor: '#4F46E5',
                        borderBottomColor: '#4F46E5',
                        transform: 'rotate(-45deg)',
                      }}
                    />
                    <div className="text-[10px] font-bold" style={{ color: '#475569' }}>
                      분기별 비중
                    </div>
                  </div>
                  <div
                    className="absolute bottom-16 right-3 p-3 rounded-xl floating2"
                    style={{ background: '#fff', boxShadow: '0 12px 24px rgba(15,23,42,0.10)', border: '1px solid #E2E8F0' }}
                  >
                    <svg className="w-14 h-5" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 56 20">
                      <path d="M0,16 L14,10 L30,13 L56,2" />
                    </svg>
                    <div className="text-[10px] font-bold mt-1.5" style={{ color: '#475569' }}>
                      성장 추이
                    </div>
                  </div>
                  <div
                    className="absolute top-10 right-5 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5"
                    style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A' }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className="ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ background: '#4ADE80' }}
                      />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22C55E' }} />
                    </span>
                    저장 완료
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━ Templates Section ━━━━━━━━━━ */}
        <div className="w-full py-28 px-6" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
          <div className="container mx-auto max-w-5xl text-center">
            <span className="font-black tracking-widest text-xs mb-3 block" style={{ color: '#FF6B35' }}>
              TEMPLATES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#0F172A' }}>
              템플릿으로 더 빠르게 시작하세요
            </h2>
            <p className="text-lg mb-14" style={{ color: '#64748B' }}>
              목적에 맞는 템플릿을 골라 데이터만 연결하면 1분 만에 완성됩니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 text-left">
              {/* Template 1 */}
              <div className="rounded-2xl overflow-hidden hcard" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
                >
                  <div className="flex items-end gap-2 h-20">
                    <div className="w-5 rounded-sm" style={{ background: '#DBEAFE', height: '40%' }} />
                    <div className="w-5 rounded-sm" style={{ background: '#4F46E5', height: '64%' }} />
                    <div className="w-5 rounded-sm" style={{ background: '#BFDBFE', height: '80%' }} />
                  </div>
                </div>
                <div className="p-7">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full mb-2"
                    style={{ background: 'rgba(79,70,229,0.10)', color: '#4F46E5' }}
                  >
                    예시 템플릿
                  </div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: '#0F172A' }}>
                    학원 예시 데이터
                  </h3>
                  <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                    교육 분야 예시 표와 추천 차트 구성으로
                    <br />
                    업로드 후 시각화 흐름을 빠르게 체험합니다
                  </p>
                  <Link
                    to="/workspace/templates"
                    className="block w-full py-2.5 text-center font-bold rounded-xl text-sm transition-all"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155' }}
                  >
                    이 템플릿 사용하기
                  </Link>
                </div>
              </div>

              {/* Template 2 (disabled) */}
              <div
                className="rounded-2xl overflow-hidden hcard disabled-card"
                style={{ background: '#fff', border: '1px solid #E2E8F0' }}
              >
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
                >
                  <svg width="100" height="60" viewBox="0 0 100 50" fill="none">
                    <path d="M0,50 L0,30 L30,25 L60,15 L100,10 L100,50 Z" fill="#ECFDF5" />
                    <path d="M0,30 L30,25 L60,15 L100,10" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <div className="p-7">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full mb-2"
                    style={{ background: '#F1F5F9', color: '#94A3B8' }}
                  >
                    🎓 학교 도메인
                  </div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: '#0F172A' }}>
                    학교 학급 관리 템플릿
                  </h3>
                  <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                    출결 관리 · 학급별 성적 분포
                    <br />
                    행사 일정 · 학부모 소통 현황
                  </p>
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 font-bold rounded-xl text-sm cursor-not-allowed"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#94A3B8' }}
                  >
                    준비 중
                  </button>
                </div>
              </div>

              {/* Template 3 (disabled) */}
              <div
                className="rounded-2xl overflow-hidden hcard disabled-card"
                style={{ background: '#fff', border: '1px solid #E2E8F0' }}
              >
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
                >
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{
                      border: '7px solid #F1F5F9',
                      borderTopColor: '#FF6B35',
                      borderRightColor: '#4F46E5',
                      borderBottomColor: '#4F46E5',
                      transform: 'rotate(-45deg)',
                    }}
                  />
                </div>
                <div className="p-7">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full mb-2"
                    style={{ background: '#F1F5F9', color: '#94A3B8' }}
                  >
                    💼 비즈니스 도메인
                  </div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: '#0F172A' }}>
                    비즈니스 성과 대시보드
                  </h3>
                  <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                    매출 · 고객 · 마케팅 채널 분석
                    <br />
                    KPI 카드 · 전환율 · 성장 추이 차트
                  </p>
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 font-bold rounded-xl text-sm cursor-not-allowed"
                    style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#94A3B8' }}
                  >
                    준비 중
                  </button>
                </div>
              </div>
            </div>
            <Link
              to="/workspace/templates"
              className="mt-12 px-8 py-3 font-bold rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm"
              style={{ border: '2px solid #4F46E5', color: '#4F46E5' }}
            >
              모든 템플릿 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ━━━━━━━━━━ CTA ━━━━━━━━━━ */}
        <div className="w-full py-28 px-6 bg-white text-center" id="usecase">
          <div
            className="max-w-2xl mx-auto rounded-3xl p-14 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #EEF2FF 0%, #FFF7ED 100%)',
              border: '1px solid #fff',
              boxShadow: '0 24px 60px rgba(15,23,42,0.10)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1.5"
              style={{ background: 'linear-gradient(90deg, #4F46E5, #FF6B35)' }}
            />
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#0F172A' }}>
              지금 바로 시작해보세요
            </h2>
            <p className="mb-10 font-medium" style={{ color: '#64748B' }}>
              무료로 사용할 수 있습니다. 신용카드가 필요 없습니다.
            </p>
            <Link
              to="/signup"
              className="text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 inline-block"
              style={{ background: '#0F172A' }}
            >
              무료로 시작하기
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
