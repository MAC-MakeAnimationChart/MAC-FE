/**
 * 선형 차트 (Line Chart)
 * - 시간 흐름에 따른 수치 변화를 선으로 연결해서 추세를 파악
 * - X축 = 시간/카테고리, Y축 = 수치
 * - 수치 컬럼이 여러 개면 각각 다른 색 선으로 자동 렌더링
 *
 * 예시:
 *   날짜       | 방문자수 | 매출
 *   2026-01-01 |  1200   |  500
 *   2026-01-02 |  1500   |  800  ← 두 개의 선이 그려짐
 */
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { gridToObjects, numericValue, numericKeys } from '../utils';
import './LineChart.css';

// 테마별 색상 팔레트 (여러 라인이 있을 때 순서대로 적용)
const THEME_COLORS = {
  orange:  ['#FF6B35', '#E85D04', '#FF9E79', '#9B2226', '#FFD3B6'],
  indigo:  ['#4F46E5', '#7C3AED', '#818CF8', '#3730A3', '#A5B4FC'],
  emerald: ['#10B981', '#059669', '#34D399', '#064E3B', '#6EE7B7'],
};

export default function LineChart({ headers, rows, chartConfig }) {
  const { xKey, title, theme = 'orange', showAverageLine, sortOrder } = chartConfig;
  const colors = THEME_COLORS[theme] || THEME_COLORS.orange;

  // 빈 데이터 처리
  if (!headers.length || !rows.length) {
    return <div className="siyun-chart-empty">데이터를 입력해주세요</div>;
  }

  // xKey를 제외한 수치 컬럼 자동 감지 → 각각 라인 하나씩
  const numCols = numericKeys(headers, rows).filter(h => h !== xKey);
  // 수치 컬럼이 없으면 yKey라도 표시
  const lines = numCols.length > 0 ? numCols : [chartConfig.yKey].filter(Boolean);

  if (!lines.length) {
    return <div className="siyun-chart-empty">수치 데이터 컬럼을 지정해주세요</div>;
  }

  // 데이터 변환: 각 행을 { xKey값, 라인1값, 라인2값, ... } 형태로
  let data = gridToObjects(headers, rows).map(row => {
    const obj = { [xKey]: row[xKey] };
    lines.forEach(col => { obj[col] = numericValue(row[col]); });
    return obj;
  });

  // 정렬 (첫 번째 수치 컬럼 기준)
  if (sortOrder === 'asc') {
    data = [...data].sort((a, b) => a[lines[0]] - b[lines[0]]);
  } else if (sortOrder === 'desc') {
    data = [...data].sort((a, b) => b[lines[0]] - a[lines[0]]);
  }

  // 첫 번째 라인 기준 평균값 계산 (평균선 표시 시)
  const avg = showAverageLine && data.length > 0
    ? Math.round(data.reduce((sum, row) => sum + row[lines[0]], 0) / data.length)
    : null;

  return (
    <div className="siyun-line-wrapper">
      {/* 차트 제목 */}
      {title && <p className="siyun-chart-title">{title}</p>}

      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
          <Legend />

          {/* 수치 컬럼마다 선 하나씩 렌더링 */}
          {lines.map((col, i) => (
            <Line
              key={col}
              type="monotone"           // 부드러운 곡선 연결
              dataKey={col}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}            // 데이터 포인트 점
              activeDot={{ r: 6 }}      // 호버 시 점 크기
            />
          ))}

          {/* 평균선 (첫 번째 라인 기준) */}
          {avg !== null && (
            <ReferenceLine
              y={avg}
              stroke={colors[0]}
              strokeDasharray="4 4"
              label={{
                value: `평균 ${avg.toLocaleString()}`,
                position: 'insideTopRight',
                fontSize: 11,
                fill: colors[0],
              }}
            />
          )}
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}
