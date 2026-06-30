/**
 * 그룹 막대 차트 (Grouped Bar Chart)
 * - 숫자형 열이 여러 개일 때 같은 X 위치에 나란히 배치해서 비교
 * - X축 열 하나를 기준으로, 나머지 숫자형 열이 각각 하나의 막대 그룹이 됨
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
  LabelList,
} from 'recharts';

import { gridToObjects, numericKeys, numericValue } from '../utils';

const CHART_THEMES = {
  orange: {
    bars: ['#FF6B35', '#F97316', '#FDBA74', '#FB923C', '#EA580C', '#C2410C'],
    grid: '#FFE5D5',
    tooltipBg: '#FFF7ED',
    text: '#9A3412',
  },
  indigo: {
    bars: ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#3730A3', '#312E81'],
    grid: '#C7D2FE',
    tooltipBg: '#EEF2FF',
    text: '#312E81',
  },
  emerald: {
    bars: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#047857', '#065F46'],
    grid: '#A7F3D0',
    tooltipBg: '#ECFDF5',
    text: '#065F46',
  },
};

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '';

  const number = Number(value);

  if (Number.isNaN(number)) return value;

  return number.toLocaleString('ko-KR');
}

export default function GroupedBarChart({ headers, rows, chartConfig }) {
  const xKey = chartConfig.xKey || headers[0];
  const theme = CHART_THEMES[chartConfig.theme] || CHART_THEMES.orange;

  const yKeys = numericKeys(headers, rows).filter((key) => key !== xKey);

  const rawData = gridToObjects(headers, rows)
    .map((row) => {
      const rowData = {
        [xKey]: row[xKey],
      };

      let totalValue = 0;

      yKeys.forEach((key) => {
        const value = numericValue(row[key]);
        rowData[key] = value;

        if (!Number.isNaN(value)) {
          totalValue += value;
        }
      });

      rowData.totalValue = totalValue;

      return rowData;
    })
    .filter((row) => row[xKey] !== undefined && row[xKey] !== '');

  const data = [...rawData].sort((a, b) => {
    if (chartConfig.sortOrder === 'asc') {
      return a.totalValue - b.totalValue;
    }

    if (chartConfig.sortOrder === 'desc') {
      return b.totalValue - a.totalValue;
    }

    return 0;
  });

  const hasGroupedData = data.length > 0 && yKeys.length > 0;

  if (!hasGroupedData) {
    return (
      <div className="jay-racing-empty">
        그룹 막대 차트로 표시할 수 있는 숫자형 데이터가 부족합니다.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 32, right: 32, left: 12, bottom: 8 }}
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
            border: `2px solid ${theme.bars[0]}`,
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

        {yKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={theme.bars[index % theme.bars.length]}
            radius={[6, 6, 0, 0]}
            animationDuration={600}
          >
            <LabelList
              dataKey={key}
              position="top"
              formatter={formatNumber}
              style={{
                fontSize: 11,
                fontWeight: 700,
                fill: theme.text,
              }}
            />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}