import React from 'react';

import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-state__card">
        {/* 그래픽 차트 이모지 센터 배치 */}
        <div className="empty-state__icon-wrapper">
          <span className="empty-state__icon">📊</span>
        </div>
        
        <h3 className="empty-state__title">아직 프로젝트가 없네요</h3>
        <p className="empty-state__description">
          새로운 시각화를 만들어 데이터를 한눈에 파악하세요.
        </p>
        
        <button type="button" className="empty-state__action-button">
          첫 번째 시각화 만들기
        </button>
      </div>
    </div>
  );
};

export default EmptyState;