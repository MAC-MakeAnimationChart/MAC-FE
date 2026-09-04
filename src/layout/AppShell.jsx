import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api';

const menuItems = [
  {
    to: '/workspace/projects',
    label: '내 프로젝트',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    to: '/workspace/templates',
    label: '템플릿',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    to: '/workspace/charts',
    label: '차트 갤러리',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const settingsItems = [
  {
    to: '/workspace/settings',
    label: '계정 설정',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

function readUserFromToken() {
  // Minimal placeholder — a proper /users/me endpoint would fill this.
  return { name: '내 계정', plan: 'Free Plan', initials: 'MA' };
}

export default function AppShell() {
  const navigate = useNavigate();
  const user = readUserFromToken();

  async function handleLogout() {
    try {
      await authApi.logout();
    } finally {
      navigate('/login', { replace: true });
    }
  }

  return (
    <div className="min-h-screen flex bg-surface" style={{ background: '#F8FAFC' }}>
      <aside
        className="w-60 flex flex-col fixed h-screen z-20"
        style={{ background: '#fff', borderRight: '1px solid #E2E8F0' }}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <Link to="/" className="text-xl font-black tracking-tighter" style={{ color: '#0F172A' }}>
            MAC
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 flex flex-col gap-1 px-3 overflow-y-auto">
          <span className="text-[10px] font-black px-3 mb-1 tracking-widest uppercase" style={{ color: '#94A3B8' }}>
            메뉴
          </span>
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <NavLink to="/studio" className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            차트 스튜디오
          </NavLink>

          <div className="mt-6" />
          <span className="text-[10px] font-black px-3 mb-1 tracking-widest uppercase" style={{ color: '#94A3B8' }}>
            설정
          </span>
          {settingsItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        <div className="p-4" style={{ borderTop: '1px solid #E2E8F0' }}>
          <div className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xs font-black"
                style={{ background: 'linear-gradient(45deg, #4F46E5, #60A5FA)' }}
              >
                {user.initials}
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: '#0F172A' }}>
                  {user.name}
                </div>
                <div className="text-xs font-semibold" style={{ color: '#64748B' }}>
                  {user.plan}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 rounded-lg text-xs font-bold transition-colors"
              style={{ background: '#fff', border: '1px solid #E2E8F0', color: '#64748B' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </aside>

      {/* Content offset for fixed sidebar */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen" style={{ background: '#F8FAFC' }}>
        <Outlet />
      </div>
    </div>
  );
}
