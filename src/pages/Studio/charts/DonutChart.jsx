/**
 * 도넛 차트 (Donut Chart)
 * - 파이 차트에서 가운데를 뚫어 도넛 모양으로 만든 것
 * - PieChart와 완전히 동일하고 innerRadius 값 하나만 다름
 * - 가운데 빈 공간에 추가 텍스트(합계 등)를 넣기 좋음
 */
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948', '#C47FFF', '#F97171'];

export default function DonutChart({ headers, rows, chartConfig }) {
  const data = gridToObjects(headers, rows).map(row => ({
    name: row[chartConfig.xKey],
    value: numericValue(row[chartConfig.yKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={65}  // ← 이 값이 PieChart와의 유일한 차이! 가운데 구멍 크기
          outerRadius={110}
          label
        >
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
