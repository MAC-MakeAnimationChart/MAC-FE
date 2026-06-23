/**
 * 선형 차트 (Line Chart)
 * - 시간 흐름에 따른 수치 변화를 선으로 연결해서 추세를 파악
 * - X축 = 시간/카테고리, Y축 = 수치
 *
 * 예시:
 *   날짜       | 방문자수
 *   2026-01-01 |  1200
 *   2026-01-02 |  1500   ← 이 점들이 선으로 연결됨
 *   2026-01-03 |  1100
 */
import {
  LineChart as RechartsLine, // recharts의 LineChart를 이름 충돌 없이 사용
  Line,                       // 실제 선을 그리는 컴포넌트
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

export default function LineChart({ headers, rows, chartConfig }) {
  const data = gridToObjects(headers, rows).map(row => ({
    ...row,
    [chartConfig.yKey]: numericValue(row[chartConfig.yKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLine data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chartConfig.xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"             // 점 사이를 부드러운 곡선으로 연결
          dataKey={chartConfig.yKey}
          stroke="#4F86C6"
          strokeWidth={2}             // 선 두께
          dot={{ r: 4 }}             // 각 데이터 포인트에 반지름 4px 점 표시
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
}
