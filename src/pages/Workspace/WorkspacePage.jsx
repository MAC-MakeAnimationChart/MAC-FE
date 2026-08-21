import React from 'react';
import { useOutletContext } from 'react-router-dom';

import WorkspaceHeader from '../../components/Workspace/WorkspaceHeader/WorkspaceHeader';
// 추후 이 서브 뷰들도 components/Workspace/ 하위 폴더로 이동 후 경로 수정 예정입니다.
// 현재는 임시로 기존 경로 형태를 유지하거나 파일 이동 후 맞출 수 있게 배치합니다.
import MyProject from '../../components/Workspace/MyProject';
import Templates from '../../components/Workspace/Templates';
import ChartGallery from '../../components/Workspace/ChartGallery';
import UserSetting from '../../components/Workspace/UserSetting';

import './WorkspacePage.css';

export default function WorkspacePage() {
  const { workspaceView } = useOutletContext();

  return (
    <main className="workspace-page__main">
      {/* 상단 헤더 툴바 */}
      <WorkspaceHeader />

      {/* 중앙 대시보드 웰컴 카드 및 서브 콘텐츠 */}
      {workspaceView === 'myProject' ? (
        <MyProject />
      ) : workspaceView === 'templates' ? (
        <Templates />
      ) : workspaceView === 'chartGallery' ? (
        <ChartGallery />
      ) : (
        <UserSetting />
      )}
    </main>
  );
}
