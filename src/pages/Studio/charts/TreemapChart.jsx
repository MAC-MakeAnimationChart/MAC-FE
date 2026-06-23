/**
 * 트리맵 차트 (Treemap Chart)
 * - 수치가 클수록 사각형이 크게 표시되는 계층형 면적 차트
 * - 항목 간 크기 비교에 직관적 (뉴스 히트맵 같은 시각화)
 * - X축 열 = 항목 이름, Y축 열 = 면적 크기 결정값
 */
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { gridToObjects, numericValue } from '../utils';

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948', '#C47FFF', '#F97171'];

/**
 * 트리맵 각 셀을 커스텀 렌더링하는 컴포넌트
 * recharts가 자동으로 x, y, width, height, name, index를 props로 넘겨줌
 */
function CustomContent({ x, y, width, height, name, index }) {
  // 너무 작은 셀은 텍스트가 안 보이므로 렌더하지 않음
  if (width < 30 || height < 20) return null;

  return (
    <g> {/* SVG 그룹 태그 */}
      {/* 색칠된 사각형 */}
      <rect
        x={x} y={y}
        width={width} height={height}
        fill={COLORS[index % COLORS.length]}
        rx={4} // 모서리 둥글기
      />
      {/* 중앙에 항목 이름 텍스트 */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={12}
        fontWeight={600}
      >
        {name}
      </text>
    </g>
  );
}

export default function TreemapChart({ headers, rows, chartConfig }) {
  // recharts Treemap은 { name, size } 형태를 받음 (size가 면적 결정)
  const data = gridToObjects(headers, rows).map(row => ({
    name: row[chartConfig.xKey],
    size: numericValue(row[chartConfig.yKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* content로 커스텀 셀 렌더러 지정 */}
      <Treemap data={data} dataKey="size" nameKey="name" content={<CustomContent />}>
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
}
