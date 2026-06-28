/**
 * 영역 차트 (Area Chart)
 * - 선형 차트와 동일하지만, 선 아래 영역을 색으로 채워 면적·볼륨을 강조
 * - 수치 컬럼이 여러 개면 각각 다른 색 영역으로 자동 렌더링
 *
 * 예시:
 *   날짜       | 방문자수 | 매출
 *   2026-01-01 |  1200   |  500
 *   2026-01-02 |  1500   |  800  ← 두 영역이 겹쳐서 그려짐
 */
import {
  AreaChart as RechartsArea,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { gridToObjects, numericValue, numericKeys } from '../utils';
import './trend.css';

// 테마별 색상 팔레트 [선 색상, 영역 채우기 색상(투명도 포함)]
const THEME_COLORS = {
  orange:  [['#FF6B35', '#FF6B3530'], ['#E85D04', '#E85D0430'], ['#FF9E79', '#FF9E7930']],
  indigo:  [['#4F46E5', '#4F46E530'], ['#7C3AED', '#7C3AED30'], ['#818CF8', '#818CF830']],
  emerald: [['#10B981', '#10B98130'], ['#059669', '#05966930'], ['#34D399', '#34D39930']],
};

export default function AreaChart({ headers, rows, chartConfig }) {
  const { xKey, title, theme = 'orange', showAverageLine, sortOrder } = chartConfig;
  const colors = THEME_COLORS[theme] || THEME_COLORS.orange;

  // 빈 데이터 처리
  if (!headers.length || !rows.length) {
    return <div className="siyun-chart-empty">데이터를 입력해주세요</div>;
  }

  // xKey를 제외한 수치 컬럼 자동 감지
  const numCols = numericKeys(headers, rows).filter(h => h !== xKey);
  const lines = numCols.length > 0 ? numCols : [chartConfig.yKey].filter(Boolean);

  if (!lines.length) {
    return <div className="siyun-chart-empty">수치 데이터 컬럼을 지정해주세요</div>;
  }

  // 데이터 변환
  let data = gridToObjects(headers, rows).map(row => {
    const obj = { [xKey]: row[xKey] };
    lines.forEach(col => { obj[col] = numericValue(row[col]); });
    return obj;
  });

  // 정렬
  if (sortOrder === 'asc') {
    data = [...data].sort((a, b) => a[lines[0]] - b[lines[0]]);
  } else if (sortOrder === 'desc') {
    data = [...data].sort((a, b) => b[lines[0]] - a[lines[0]]);
  }

  // 첫 번째 컬럼 기준 평균값
  const avg = showAverageLine && data.length > 0
    ? Math.round(data.reduce((sum, row) => sum + row[lines[0]], 0) / data.length)
    : null;

  return (
    <div className="siyun-line-wrapper">
      {title && <p className="siyun-chart-title">{title}</p>}

      <ResponsiveContainer width="100%" height="100%">
        <RechartsArea data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
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

          {/* 수치 컬럼마다 영역 하나씩 렌더링 */}
          {lines.map((col, i) => {
            const [stroke, fill] = colors[i % colors.length];
            return (
              <Area
                key={col}
                type="monotone"       // 부드러운 곡선
                dataKey={col}
                stroke={stroke}
                fill={fill}           // 선 아래 영역 색 (30% 투명도)
                strokeWidth={2}
              />
            );
          })}

          {/* 평균선 */}
          {avg !== null && (
            <ReferenceLine
              y={avg}
              stroke={colors[0][0]}
              strokeDasharray="4 4"
              label={{
                value: `평균 ${avg.toLocaleString()}`,
                position: 'insideTopRight',
                fontSize: 11,
                fill: colors[0][0],
              }}
            />
          )}
        </RechartsArea>
      </ResponsiveContainer>
    </div>
  );
}
