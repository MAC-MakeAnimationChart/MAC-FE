import React, { useState } from 'react';

import Sidebar from '../../components/Workpspace/layout/Sidebar';
import WorkspaceHeader from '../../components/Workpspace/layout/WorkspaceHeader';

import './WorkspacePage.css';
import MyProject from '../../components/Workpspace/MyProject';
import Templates from '../../components/Workpspace/Templates'
import ChartGallery from '../../components/Workpspace/ChartGallery';
import UserSetting from '../../components/Workpspace/UserSetting';

const WorkspacePage = () => {

  const [sideSelected, setSideSelected] = useState('myProject')

  return (
    <div className="workspace-page">
      {/* 1. 좌측 메뉴바 고정 */}
      <Sidebar nav={sideSelected} setNavSelect={setSideSelected} />

      {/* 2. 우측 스페이스 레이아웃 구성 */}
      <main className="workspace-page__main">
        {/* 상단 헤더 툴바 */}
        <WorkspaceHeader />

        {/* 중앙 대시보드 웰컴 카드 */}
        {sideSelected === 'myProject' ? (
          <MyProject />
        ) : sideSelected === 'templates' ? (
          <Templates />
        ) : sideSelected === 'chartGallery' ? (
          <ChartGallery />
        ) : <UserSetting />}
      </main>
    </div>
  );
};

export default WorkspacePage;