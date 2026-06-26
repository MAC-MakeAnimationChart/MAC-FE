/**
 * 카드 차트 / KPI 카드 (Card Chart)
 * - 숫자형 열마다 합계를 큰 숫자로 카드에 표시하는 대시보드형 시각화
 * - 차트가 아닌 텍스트 기반이라 recharts 불필요, 순수 HTML/CSS로 구현
 *
 * 예시:
 *   온라인매출 | 오프라인매출 | 환불금액
 *     1,000   |    2,000    |   300     ← 각 열 합계가 카드 하나씩
 */
import { numericKeys, numericValue } from '../utils';
import './trend.css';

export default function CardChart({ headers, rows }) {
  // 숫자형 열 헤더만 추림 (문자열 열은 합계가 의미없으므로 제외)
  const yKeys = numericKeys(headers, rows);

  // 각 숫자형 열의 전체 합계 계산
  const totals = yKeys.map(key => ({
    label: key,
    // headers.indexOf(key): 헤더에서 해당 열의 인덱스를 찾아서 rows에서 값 꺼냄
    value: rows.reduce((sum, row) => sum + numericValue(row[headers.indexOf(key)]), 0),
  }));

  return (
    <div className="siyun-card-grid">
      {totals.map(({ label, value }) => (
        <div key={label} className="siyun-card-item">
          <div className="siyun-card-label">{label}</div>
          {/* toLocaleString(): 숫자에 쉼표 자동 추가 (1000 → 1,000) */}
          <div className="siyun-card-value">{value.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
