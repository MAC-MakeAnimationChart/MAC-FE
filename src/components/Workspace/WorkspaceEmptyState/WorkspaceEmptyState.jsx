import React from 'react';

import './WorkspaceEmptyState.css';

export default function WorkspaceEmptyState() {
  return (
    <div className="workspace-empty-state">
      <div className="workspace-empty-state__card">
        {/* 그래픽 차트 이모지 센터 배치 */}
        <div className="workspace-empty-state__icon-wrapper">
          <span className="workspace-empty-state__icon">📊</span>
        </div>
        
        <h3 className="workspace-empty-state__title">아직 프로젝트가 없네요</h3>
        <p className="workspace-empty-state__description">
          새로운 시각화를 만들어 데이터를 한눈에 파악하세요.
        </p>
        
        <button type="button" className="workspace-empty-state__action-button">
          첫 번째 시각화 만들기
        </button>
      </div>
    </div>
  );
}