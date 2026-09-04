import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi, ApiError } from '../../api';

export default function SignupPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await authApi.register({ email, password, nickname });
      await authApi.login({ email, password });
      navigate('/workspace/projects', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* 왼쪽 브랜드 패널 */}
      <div
        className="hidden md:flex w-[420px] shrink-0 flex-col justify-between p-14 relative overflow-hidden"
        style={{ borderRight: '1px solid #E2E8F0' }}
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'rgba(79,70,229,0.06)', filter: 'blur(48px)' }}
        />
        <Link to="/" className="text-2xl font-black tracking-tighter relative z-10" style={{ color: '#0F172A' }}>
          MAC
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-8 leading-tight" style={{ color: '#0F172A' }}>
            30초 만에<br />워크스페이스 생성
          </h2>
          <ul className="space-y-3">
            {['CSV · 엑셀 업로드', '차트 초안 자동 생성', '팔레트 · 폰트 자동 튜닝', '무료 플랜으로 바로 시작'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#334155' }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: '#4F46E5' }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
        <p className="text-xs font-medium relative z-10" style={{ color: '#94A3B8' }}>
          이미 5만 명이 MAC 으로 데이터를 시각화하고 있어요.
        </p>
      </div>

      {/* 오른쪽 폼 패널 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white relative px-8">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold"
          style={{ color: '#64748B' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          돌아가기
        </Link>

        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-2xl font-black tracking-tighter block mb-1" style={{ color: '#0F172A' }}>
              MAC
            </span>
            <h2 className="text-xl font-extrabold mb-1.5" style={{ color: '#0F172A' }}>
              시작하기
            </h2>
            <p className="text-sm font-medium" style={{ color: '#64748B' }}>
              계정을 만들고 데이터를 시각화해보세요.
            </p>
          </div>

          <form noValidate className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="닉네임"
              className="inp"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              minLength={2}
              maxLength={20}
            />
            <input
              type="email"
              placeholder="이메일 주소"
              className="inp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="비밀번호 (8자 이상)"
                className="inp pr-14"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold"
                style={{ color: '#64748B' }}
              >
                {showPw ? '숨기기' : '보기'}
              </button>
            </div>

            {error && (
              <div
                className="text-xs font-bold px-3 py-2 rounded-lg"
                style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-60"
              style={{ background: '#FF6B35' }}
            >
              {submitting ? '가입 중…' : '계정 만들기'}
            </button>
          </form>

          <p className="text-center text-sm font-medium mt-5" style={{ color: '#64748B' }}>
            이미 계정이 있으신가요?
            <Link to="/login" className="font-bold ml-1 hover:underline" style={{ color: '#4F46E5' }}>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
