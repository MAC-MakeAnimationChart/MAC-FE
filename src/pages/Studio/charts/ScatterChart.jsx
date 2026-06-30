/**
 * 산점도 (Scatter Chart)
 * - X축과 Y축 모두 숫자값으로, 두 변수 간의 상관관계를 점으로 표현
 * - "X가 커질수록 Y도 커지는가?" 같은 관계 파악에 사용
 * - ⚠️ X축도 숫자 컬럼이어야 의미 있음
 *
 * 예시:
 *   공부시간 | 시험점수
 *      2    |   60     ← (2, 60) 위치에 점
 *      4    |   75
 *      6    |   88
 */
import {
  ScatterChart as RechartsScatter,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue, numericKeys } from '../utils';
import './ScatterChart.css';

// 테마별 점 색상
const THEME_COLORS = {
  orange:  ['#FF6B35', '#E85D04', '#FF9E79'],
  indigo:  ['#4F46E5', '#7C3AED', '#818CF8'],
  emerald: ['#10B981', '#059669', '#34D399'],
};

// 커스텀 툴팁: X/Y 축 이름을 실제 컬럼명으로 표시
function CustomTooltip({ active, payload, xKey, yKey }) {
  if (!active || !payload?.length) return null;
  const { x, y } = payload[0].payload;
  return (
    <div className="siyun-scatter-tooltip">
      <p>{xKey}: <strong>{x.toLocaleString()}</strong></p>
      <p>{yKey}: <strong>{y.toLocaleString()}</strong></p>
    </div>
  );
}

export default function ScatterChart({ headers, rows, chartConfig }) {
  const { xKey, yKey, title, theme = 'orange' } = chartConfig;
  const colors = THEME_COLORS[theme] || THEME_COLORS.orange;

  // 빈 데이터 처리
  if (!headers.length || !rows.length) {
    return <div className="siyun-chart-empty">데이터를 입력해주세요</div>;
  }

  // xKey / yKey 유효성 확인
  const numCols = numericKeys(headers, rows);
  if (!xKey || !yKey) {
    return <div className="siyun-chart-empty">X축과 Y축 컬럼을 지정해주세요</div>;
  }

  // { x, y } 형태로 변환 (산점도는 두 수치 축이 필요)
  const data = gridToObjects(headers, rows)
    .map(row => ({
      x: numericValue(row[xKey]),
      y: numericValue(row[yKey]),
    }))
    .filter(d => d.x !== 0 || d.y !== 0); // 완전히 빈 행 제외

  // yKey가 수치 아닌 경우 안내
  if (!numCols.includes(xKey) && !numCols.includes(yKey)) {
    return <div className="siyun-chart-empty">X축 또는 Y축에 수치 컬럼을 선택해주세요</div>;
  }

  return (
    <div className="siyun-line-wrapper">
      {title && <p className="siyun-chart-title">{title}</p>}

      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatter margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          {/* type="number": 숫자 스케일로 축 설정 */}
          <XAxis
            dataKey="x"
            name={xKey}
            type="number"
            tick={{ fontSize: 12 }}
            label={{ value: xKey, position: 'insideBottom', offset: -2, fontSize: 12 }}
          />
          <YAxis
            dataKey="y"
            name={yKey}
            type="number"
            tick={{ fontSize: 12 }}
            label={{ value: yKey, angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          {/* ZAxis: 점 크기 고정 */}
          <ZAxis range={[50, 50]} />
          <Tooltip
            content={<CustomTooltip xKey={xKey} yKey={yKey} />}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Legend />
          <Scatter
            name={`${xKey} vs ${yKey}`}
            data={data}
            fill={colors[0]}
            opacity={0.8}
          />
        </RechartsScatter>
      </ResponsiveContainer>
    </div>
  );
}
