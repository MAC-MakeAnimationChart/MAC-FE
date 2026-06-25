/**
 * 누적 막대 차트 (Stacked Bar Chart)
 * - 여러 숫자형 열을 하나의 막대에 쌓아서 전체 합과 구성 비율을 동시에 표현
 * - GroupedBarChart와 데이터 처리는 동일하고, <Bar>에 stackId 추가만 다름
 *
 * 예시:
 *   분기  | 온라인매출 | 오프라인매출
 *   1분기 |   100     |    200       ← 한 막대에 100 위에 200이 쌓임 (합계 300)
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

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948'];

export default function StackedBarChart({ headers, rows, chartConfig }) {
  const yKeys = numericKeys(headers, rows).filter(k => k !== chartConfig.xKey);

  const data = gridToObjects(headers, rows).map(row => {
    const obj = { [chartConfig.xKey]: row[chartConfig.xKey] };
    yKeys.forEach(k => { obj[k] = numericValue(row[k]); });
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
        {/* stackId가 같은 <Bar>끼리 같은 막대 위에 쌓임 — 이름은 아무거나 동일하게 */}
        {yKeys.map((k, i) => (
          <Bar key={k} dataKey={k} stackId="stack" fill={COLORS[i % COLORS.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
