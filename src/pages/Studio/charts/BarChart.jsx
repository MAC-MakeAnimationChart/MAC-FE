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
  LabelList,
  ReferenceLine,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

const CHART_THEMES = {
  orange: {
    bar: '#FF6B35',
    hover: '#E85A24',
    grid: '#FFE5D5',
    tooltipBg: '#FFF7ED',
    text: '#9A3412',
    average: '#DC2626',
  },
  indigo: {
    bar: '#4F46E5',
    hover: '#3730A3',
    grid: '#C7D2FE',
    tooltipBg: '#EEF2FF',
    text: '#312E81',
    average: '#BE123C',
  },
  emerald: {
    bar: '#059669',
    hover: '#047857',
    grid: '#A7F3D0',
    tooltipBg: '#ECFDF5',
    text: '#065F46',
    average: '#B91C1C',
  },
};

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '';

  const number = Number(value);

  if (Number.isNaN(number)) return value;

  return number.toLocaleString('ko-KR');
}

export default function BarChart({ headers, rows, chartConfig }) {
  const xKey = chartConfig.xKey || headers[0];
  const yKey = chartConfig.yKey || headers[1];

  const theme = CHART_THEMES[chartConfig.theme] || CHART_THEMES.orange;

  const rawData = gridToObjects(headers, rows)
    .map(row => ({
      ...row,
      [yKey]: numericValue(row[yKey]),
    }))
    .filter(row => row[xKey] !== undefined && row[xKey] !== '' && !Number.isNaN(row[yKey]));

  const data = [...rawData].sort((a, b) => {
    if (chartConfig.sortOrder === 'asc') {
      return a[yKey] - b[yKey];
    }

    if (chartConfig.sortOrder === 'desc') {
      return b[yKey] - a[yKey];
    }

    return 0;
  });

  const averageValue =
    data.length > 0
      ? data.reduce((sum, row) => sum + row[yKey], 0) / data.length
      : 0;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {chartConfig.title && (
        <h3
          style={{
            margin: '0 0 12px',
            textAlign: 'center',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: theme.text,
          }}
        >
          {chartConfig.title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={chartConfig.title ? '90%' : '100%'}>
        <RechartsBar
          data={data}
          margin={{ top: 28, right: 28, left: 16, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />

          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: theme.text }}
            interval={0}
          />

          <YAxis
            tickFormatter={formatNumber}
            tick={{ fontSize: 12, fill: theme.text }}
          />

          <Tooltip
            formatter={(value, name) => [formatNumber(value), name]}
            labelFormatter={(label) => `${xKey}: ${label}`}
            contentStyle={{
              backgroundColor: theme.tooltipBg,
              border: `2px solid ${theme.bar}`,
              borderRadius: '12px',
              color: theme.text,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            }}
          />

          <Legend
            wrapperStyle={{
              color: theme.text,
              fontWeight: 600,
            }}
          />

          {chartConfig.showAverageLine !== false && data.length > 0 && (
            <ReferenceLine
              y={averageValue}
              stroke={theme.average}
              strokeDasharray="6 4"
              label={{
                value: `평균 ${formatNumber(Math.round(averageValue))}`,
                position: 'top',
                fill: theme.average,
                fontSize: 12,
                fontWeight: 700,
              }}
            />
          )}

          <Bar
            dataKey={yKey}
            fill={theme.bar}
            activeBar={{ fill: theme.hover }}
            radius={[8, 8, 0, 0]}
            animationDuration={700}
          >
            <LabelList
              dataKey={yKey}
              position="top"
              formatter={formatNumber}
              style={{
                fontSize: 12,
                fill: theme.text,
                fontWeight: 700,
              }}
            />
          </Bar>
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}