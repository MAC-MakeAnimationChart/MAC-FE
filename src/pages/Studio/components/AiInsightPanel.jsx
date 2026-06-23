// AI 인사이트 패널 — 추후 AI API 연동 시 이 파일만 수정
export default function AiInsightPanel() {
  return (
    <div className="st-ai-insight-card">
      <div className="st-card-top-bar">
        <span className="st-card-tab-title">🤖 AI Smart 데이터 분석 인사이트</span>
        <button className="st-btn-regenerate-ai">새로고침</button>
      </div>
      <div className="st-insight-content">
        <p className="st-insight-p">
          🚀 <strong>데이터 패턴 분석 보고:</strong> 업로드된 매출 데이터 세트에서{' '}
          <strong>2분기정산</strong> 시점에 최대 매출 피크(24,500,000)가 검출되었습니다.
          직전 구간 대비 평균 55% 급성장한 수치입니다.
        </p>
        <p className="st-insight-p">
          ⚠️ <strong>이상치 가이드:</strong> 비고 행의 2번째 인덱스 열에서 공백 유실값이
          식별되어 자동 보정 레이어가 할당되었습니다. 시각화 그래프 왜곡을 막기 위해
          연산 제외 처리를 추천합니다.
        </p>
      </div>
    </div>
  );
}
