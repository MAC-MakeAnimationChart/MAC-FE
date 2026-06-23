/**
 * 기본 막대 차트 (Bar Chart)
 * - X축에 카테고리, Y축에 수치를 놓고 막대로 비교하는 가장 기본 차트
 * - 사이드바에서 선택한 X축/Y축 열 기준으로 자동 렌더링됨
 *
 * props:
 *   headers    - 열 이름 배열          예: ['날짜', '매출', '비고']
 *   rows       - 실제 데이터 2차원 배열  예: [['2026-01', '100', '정상'], ...]
 *   chartConfig - 사이드바 설정값       예: { xKey: '날짜', yKey: '매출', title: '...' }
 */
import {
  BarChart as RechartsBar, // recharts의 BarChart를 이름 충돌 없이 사용
  Bar,                      // 실제 막대 하나를 그리는 컴포넌트
  XAxis,                    // 가로축
  YAxis,                    // 세로축
  CartesianGrid,            // 배경 격자선
  Tooltip,                  // 마우스 올렸을 때 값 말풍선
  Legend,                   // 범례 (어떤 색이 뭔지)
  ResponsiveContainer,      // 부모 크기에 맞게 차트를 자동으로 늘리고 줄임
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

export default function BarChart({ headers, rows, chartConfig }) {
  // gridToObjects: [['2026-01','100']] → [{ 날짜:'2026-01', 매출:'100' }] 형태로 변환
  // numericValue: Y축 값이 문자열('1,000')일 수 있어서 숫자로 강제 변환
  const data = gridToObjects(headers, rows).map(row => ({
    ...row,
    [chartConfig.yKey]: numericValue(row[chartConfig.yKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBar data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* dataKey: 어떤 열 값을 X축 레이블로 쓸지 */}
        <XAxis dataKey={chartConfig.xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* radius: [상단좌, 상단우, 하단우, 하단좌] - 막대 상단만 둥글게 */}
        <Bar dataKey={chartConfig.yKey} fill="#FF6B35" radius={[4, 4, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
