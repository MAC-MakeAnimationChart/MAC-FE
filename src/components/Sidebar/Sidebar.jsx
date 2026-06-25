import React from 'react';

import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* 서비스 로고 로고타입 */}
      <div className="sidebar__logo">MAC</div>

      {/* 메인 서비스 이동 메뉴 그룹 */}
      <nav className="sidebar__nav">
        <p className="sidebar__section-title">메뉴</p>
        <ul className="sidebar__menu-list">
          <li className="sidebar__menu-item sidebar__menu-item--active">
            <span className="sidebar__menu-icon">📁</span> 내 프로젝트
          </li>
          <li className="sidebar__menu-item">
            <span className="sidebar__menu-icon">🗂️</span> 템플릿
          </li>
          <li className="sidebar__menu-item">
            <span className="sidebar__menu-icon">📊</span> 차트 갤러리
          </li>
        </ul>

        {/* 사용자 환경설정 메뉴 그룹 */}
        <p className="sidebar__section-title">설정</p>
        <ul className="sidebar__menu-list">
          <li className="sidebar__menu-item">
            <span className="sidebar__menu-icon">⚙️</span> 계정 설정
          </li>
        </ul>
      </nav>

      {/* 하단 현재 로그인한 유저 프로필 및 로그아웃 블록 */}
      <div className="sidebar__profile">
        <div className="sidebar__profile-info">
          <div className="sidebar__avatar">김민</div>
          <div className="sidebar__user-details">
            <span className="sidebar__username">김민수</span>
            <span className="sidebar__plan">Free Plan</span>
          </div>
        </div>
        <button type="button" className="sidebar__logout-button">로그아웃</button>
      </div>
    </aside>
  );
};

export default Sidebar;