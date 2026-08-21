import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import './WorkspaceSidebar.css';

const pageLinks = [
  { to: '/', label: '홈', icon: '⌂', end: true },
  { to: '/studio', label: 'Studio', icon: '▦' },
  { to: '/pricing', label: 'Pricing', icon: '$' },
];

const authLinks = [
  { to: '/login', label: 'Login', icon: '→' },
  { to: '/signup', label: 'Signup', icon: '+' },
];

const WorkspaceSidebar = ({ nav, setNavSelect }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onWorkspacePage = pathname === '/workspace';

  const selectWorkspaceNav = (value) => {
    setNavSelect(value);
    navigate('/workspace');
  };

  return (
    <aside className="workspace-sidebar">
      {/* 서비스 로고 로고타입 */}
      <div className="workspace-sidebar__logo">MAC</div>

      {/* 메인 서비스 이동 메뉴 그룹 */}
      <nav className="workspace-sidebar__nav">
        <p className="workspace-sidebar__section-title">페이지</p>
        <ul className="workspace-sidebar__menu-list">
          {pageLinks.map(({ to, label, icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `workspace-sidebar__menu-item${isActive ? ' workspace-sidebar__menu-item--active' : ''}`
                }
              >
                <span className="workspace-sidebar__menu-icon">{icon}</span> {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="workspace-sidebar__section-title">메뉴</p>
        <ul className="workspace-sidebar__menu-list">
          <li
            className={`workspace-sidebar__menu-item ${nav === 'myProject' && onWorkspacePage ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => selectWorkspaceNav('myProject')}
          >
            <span className="workspace-sidebar__menu-icon">📁</span> 내 프로젝트
          </li>
          <li
            className={`workspace-sidebar__menu-item ${nav === 'templates' && onWorkspacePage ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => selectWorkspaceNav('templates')}
          >
            <span className="workspace-sidebar__menu-icon">🗂️</span> 템플릿
          </li>
          <li
            className={`workspace-sidebar__menu-item ${nav === 'chartGallery' && onWorkspacePage ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => selectWorkspaceNav('chartGallery')}
          >
            <span className="workspace-sidebar__menu-icon">📊</span> 차트 갤러리
          </li>
        </ul>

        {/* 사용자 환경설정 메뉴 그룹 */}
        <p className="workspace-sidebar__section-title">설정</p>
        <ul className="workspace-sidebar__menu-list">
          <li
            className={`workspace-sidebar__menu-item ${nav === 'userSetting' && onWorkspacePage ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => selectWorkspaceNav('userSetting')}
          >
            <span className="workspace-sidebar__menu-icon">⚙️</span> 계정 설정
          </li>
          {authLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `workspace-sidebar__menu-item${isActive ? ' workspace-sidebar__menu-item--active' : ''}`
                }
              >
                <span className="workspace-sidebar__menu-icon">{icon}</span> {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* 하단 현재 로그인한 유저 프로필 및 로그아웃 블록 */}
      <div className="workspace-sidebar__profile">
        <div className="workspace-sidebar__profile-info">
          <div className="workspace-sidebar__avatar">김민</div>
          <div className="workspace-sidebar__user-details">
            <span className="workspace-sidebar__username">김민수</span>
            <span className="workspace-sidebar__plan">Free Plan</span>
          </div>
        </div>
        <button type="button" className="workspace-sidebar__logout-button">
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;