/**
 * 영역 차트 (Area Chart)
 * - 선형 차트와 동일하지만, 선 아래 영역을 색으로 채워 면적을 강조
 * - 누적량·볼륨 표현에 적합 (방문자 수, 매출 흐름 등)
 * - LineChart와 코드가 거의 동일하고 <Line> → <Area> 변경이 핵심
 */
import {
  AreaChart as RechartsArea, // recharts의 AreaChart를 이름 충돌 없이 사용
  Area,                       // 선 아래를 채우는 영역 컴포넌트
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

export default function AreaChart({ headers, rows, chartConfig }) {
  const data = gridToObjects(headers, rows).map(row => ({
    ...row,
    [chartConfig.yKey]: numericValue(row[chartConfig.yKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsArea data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chartConfig.xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={chartConfig.yKey}
          stroke="#4F86C6"          // 선 색상
          fill="#4F86C633"          // 영역 채우기 색상 (33 = 20% 투명도 hex)
          strokeWidth={2}
        />
      </RechartsArea>
    </ResponsiveContainer>
  );
}
