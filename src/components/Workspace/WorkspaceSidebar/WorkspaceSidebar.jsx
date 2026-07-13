import React from 'react';

import './WorkspaceSidebar.css';

const WorkspaceSidebar = ({ nav, setNavSelect }) => {
  return (
    <aside className="workspace-sidebar">
      {/* 서비스 로고 로고타입 */}
      <div className="workspace-sidebar__logo">MAC</div>

      {/* 메인 서비스 이동 메뉴 그룹 */}
      <nav className="workspace-sidebar__nav">
        <p className="workspace-sidebar__section-title">메뉴</p>
        <ul className="workspace-sidebar__menu-list">
          <li
            className={`workspace-sidebar__menu-item ${nav === 'myProject' ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => setNavSelect('myProject')}
          >
            <span className="workspace-sidebar__menu-icon">📁</span> 내 프로젝트
          </li>
          <li
            className={`workspace-sidebar__menu-item ${nav === 'templates' ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => setNavSelect('templates')}
          >
            <span className="workspace-sidebar__menu-icon">🗂️</span> 템플릿
          </li>
          <li
            className={`workspace-sidebar__menu-item ${nav === 'chartGallery' ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => setNavSelect('chartGallery')}
          >
            <span className="workspace-sidebar__menu-icon">📊</span> 차트 갤러리
          </li>
        </ul>

        {/* 사용자 환경설정 메뉴 그룹 */}
        <p className="workspace-sidebar__section-title">설정</p>
        <ul className="workspace-sidebar__menu-list">
          <li
            className={`workspace-sidebar__menu-item ${nav === 'userSetting' ? 'workspace-sidebar__menu-item--active' : ''}`}
            onClick={() => setNavSelect('userSetting')}
          >
            <span className="workspace-sidebar__menu-icon">⚙️</span> 계정 설정
          </li>
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