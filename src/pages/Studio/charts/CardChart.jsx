/**
 * 카드 차트 / KPI 카드 (Card Chart)
 * - 숫자형 열마다 합계를 큰 숫자로 카드에 표시하는 대시보드형 시각화
 * - recharts 불필요, 순수 HTML/CSS로 구현
 *
 * 예시:
 *   온라인매출 | 오프라인매출 | 환불금액
 *     1,000   |    2,000    |   300   ← 각 열 합계가 카드 하나씩
 */
import { numericKeys, numericValue } from '../utils';
import './CardChart.css';

// 테마별 강조 색상
const THEME_ACCENT = {
  orange:  '#FF6B35',
  indigo:  '#4F46E5',
  emerald: '#10B981',
};

// 테마별 카드 배경 색상
const THEME_BG = {
  orange:  '#FFF7ED',
  indigo:  '#EEF2FF',
  emerald: '#ECFDF5',
};

export default function CardChart({ headers, rows, chartConfig }) {
  const { title, theme = 'orange' } = chartConfig || {};
  const accent = THEME_ACCENT[theme] || THEME_ACCENT.orange;
  const bg = THEME_BG[theme] || THEME_BG.orange;

  // 빈 데이터 처리
  if (!headers.length || !rows.length) {
    return <div className="siyun-chart-empty">데이터를 입력해주세요</div>;
  }

  // 수치 컬럼만 추림
  const yKeys = numericKeys(headers, rows);

  if (!yKeys.length) {
    return <div className="siyun-chart-empty">수치 데이터 컬럼이 없습니다</div>;
  }

  // 각 수치 컬럼의 합계 / 평균 / 최댓값 계산
  const cards = yKeys.map(key => {
    const colIdx = headers.indexOf(key);
    const values = rows.map(row => numericValue(row[colIdx])).filter(v => v !== 0 || rows.some(r => r[colIdx] !== ''));
    const total = values.reduce((sum, v) => sum + v, 0);
    const avg = values.length > 0 ? Math.round(total / values.length) : 0;
    const max = values.length > 0 ? Math.max(...values) : 0;
    return { label: key, total, avg, max };
  });

  return (
    <div className="siyun-card-wrapper">
      {/* 차트 제목 */}
      {title && <p className="siyun-chart-title">{title}</p>}

      <div className="siyun-card-grid">
        {cards.map(({ label, total, avg, max }) => (
          <div key={label} className="siyun-card-item" style={{ backgroundColor: bg }}>
            <div className="siyun-card-label">{label}</div>
            {/* 합계 — 가장 크게 */}
            <div className="siyun-card-value" style={{ color: accent }}>
              {total.toLocaleString()}
            </div>
            {/* 평균 / 최댓값 — 작게 */}
            <div className="siyun-card-meta">
              <span>평균 {avg.toLocaleString()}</span>
              <span>최대 {max.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
