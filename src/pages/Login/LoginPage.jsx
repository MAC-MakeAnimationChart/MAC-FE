import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authApi, ApiError } from '../../api';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from || '/workspace/projects';

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await authApi.login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '로그인에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* 왼쪽 브랜드 패널 */}
      <div
        className="hidden md:flex w-[420px] shrink-0 flex-col justify-between p-14 relative overflow-hidden"
        style={{ borderRight: '1px solid #E2E8F0', background: '#fff' }}
      >
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,107,53,0.05)', filter: 'blur(48px)' }}
        />
        <Link to="/" className="text-2xl font-black tracking-tighter relative z-10" style={{ color: '#0F172A' }}>
          MAC
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-8 leading-tight" style={{ color: '#0F172A' }}>
            데이터가 차트가<br />되는 순간
          </h2>
          <div className="flex items-end gap-1.5 h-14 mb-8">
            <div className="w-4 rounded-t-sm" style={{ height: '40%', background: '#BFDBFE' }} />
            <div className="w-4 rounded-t-sm shadow-lg" style={{ height: '100%', background: '#4F46E5' }} />
            <div className="w-4 rounded-t-sm" style={{ height: '65%', background: 'rgba(255,107,53,0.6)' }} />
            <div className="w-4 rounded-t-sm" style={{ height: '50%', background: '#93C5FD' }} />
            <div className="w-4 rounded-t-sm" style={{ height: '80%', background: '#34D399' }} />
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: '#64748B' }}>
            CSV를 올리면 1분 만에<br />전문가 수준의 차트가 완성됩니다.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex -space-x-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{ background: '#4F46E5', border: '2px solid #fff' }}
            >
              김
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{ background: '#FF6B35', border: '2px solid #fff' }}
            >
              이
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{ background: '#10B981', border: '2px solid #fff' }}
            >
              박
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black"
              style={{ background: '#E2E8F0', color: '#475569', border: '2px solid #fff' }}
            >
              +5만
            </div>
          </div>
          <p className="text-xs font-medium" style={{ color: '#64748B' }}>
            50,000명이 사용 중
          </p>
        </div>
      </div>

      {/* 오른쪽 폼 패널 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white relative px-8">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold transition-colors"
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
              다시 오신 것을 환영해요
            </h2>
            <p className="text-sm font-medium" style={{ color: '#64748B' }}>
              계정에 로그인하고 시각화를 이어가세요.
            </p>
          </div>

          <form noValidate className="space-y-3" onSubmit={handleSubmit}>
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
                placeholder="비밀번호"
                className="inp pr-14"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors"
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
              style={{ background: '#4F46E5' }}
            >
              {submitting ? '로그인 중…' : '로그인'}
            </button>
          </form>

          <p className="text-center text-sm font-medium mt-5" style={{ color: '#64748B' }}>
            아직 계정이 없나요?
            <Link to="/signup" className="font-bold ml-1 hover:underline" style={{ color: '#4F46E5' }}>
              무료로 시작하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
