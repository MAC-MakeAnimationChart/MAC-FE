/**
 * 그룹 막대 차트 (Grouped Bar Chart)
 * - 숫자형 열이 여러 개일 때 같은 X 위치에 나란히 배치해서 비교
 * - X축 열 하나를 기준으로, 나머지 숫자형 열이 각각 하나의 막대 그룹이 됨
 *
 * 예시:
 *   분기  | 온라인매출 | 오프라인매출
 *   1분기 |   100     |    200       ← 두 막대가 나란히
 *   2분기 |   150     |    180
 */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue, numericKeys } from '../utils';

// 각 그룹(열)에 순서대로 배정할 색상
const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948'];

export default function GroupedBarChart({ headers, rows, chartConfig }) {
  // numericKeys: 숫자형 열 헤더만 추림 → X축 열은 레이블이므로 제외
  const yKeys = numericKeys(headers, rows).filter(k => k !== chartConfig.xKey);

  const data = gridToObjects(headers, rows).map(row => {
    const obj = { [chartConfig.xKey]: row[chartConfig.xKey] }; // X축 레이블
    yKeys.forEach(k => { obj[k] = numericValue(row[k]); });    // 숫자형 열 전부 추가
    return obj;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chartConfig.xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* 숫자형 열 개수만큼 <Bar>를 자동 생성, 색상은 순서대로 */}
        {yKeys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
