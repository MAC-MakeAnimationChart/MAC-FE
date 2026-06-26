/**
 * 파이 차트 (Pie Chart)
 * - 전체 합에서 각 항목이 차지하는 비율을 부채꼴로 표현
 * - X축 열 = 항목 이름(레이블), Y축 열 = 수치(크기 결정)
 *
 * 예시:
 *   항목  | 매출
 *   서울  | 300   ← 전체 600 중 50% 크기 부채꼴
 *   부산  | 200
 *   대구  | 100
 */
import {
  PieChart as RechartsPie, // recharts의 PieChart를 이름 충돌 없이 사용
  Pie,                      // 실제 파이(원형) 데이터를 그리는 컴포넌트
  Tooltip,
  Legend,
  Cell,                     // 각 조각에 개별 색상 지정
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948', '#C47FFF', '#F97171'];

export default function PieChart({ headers, rows, chartConfig }) {
  // recharts Pie는 { name, value } 형태의 배열을 받음
  const data = gridToObjects(headers, rows).map(row => ({
    name: row[chartConfig.xKey],               // 항목 이름 (레이블)
    value: numericValue(row[chartConfig.yKey]), // 수치 (크기 결정)
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie>
        <Pie
          data={data}
          dataKey="value"   // 크기를 결정하는 필드
          nameKey="name"    // 레이블로 쓸 필드
          cx="50%"          // 원의 중심 X (부모의 50% 위치)
          cy="50%"          // 원의 중심 Y
          outerRadius={110} // 원 반지름(px)
          label             // 각 조각 위에 레이블 표시
        >
          {/* 조각마다 색상 개별 지정 */}
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPie>
    </ResponsiveContainer>
  );
}
