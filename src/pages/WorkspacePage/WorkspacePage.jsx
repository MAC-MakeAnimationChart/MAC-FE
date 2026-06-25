import React from 'react';

import Sidebar from '../../components/Sidebar/Sidebar';
import WorkspaceHeader from '../../components/WorkspaceHeader/WorkspaceHeader';
import EmptyState from '../../components/EmptyState/EmptyState';

import './WorkspacePage.css';

const WorkspacePage = () => {
  return (
    <div className="workspace-page">
      {/* 1. 좌측 메뉴바 고정 */}
      <Sidebar />
      
      {/* 2. 우측 스페이스 레이아웃 구성 */}
      <main className="workspace-page__main">
        {/* 상단 헤더 툴바 */}
        <WorkspaceHeader />
        
        {/* 중앙 대시보드 웰컴 카드 */}
        <EmptyState />
      </main>
    </div>
  );
};

export default WorkspacePage;