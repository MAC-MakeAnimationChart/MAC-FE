import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

import './BarChart.css';

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
    .map((row) => ({
      ...row,
      [yKey]: numericValue(row[yKey]),
    }))
    .filter((row) => row[xKey] !== undefined && row[xKey] !== '' && !Number.isNaN(row[yKey]));

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

  const hasTitle = Boolean(chartConfig.title);

  return (
    <div className="bar-chart">
      {hasTitle && (
        <h3
          className="bar-chart__title"
          style={{ color: theme.text }}
        >
          {chartConfig.title}
        </h3>
      )}

      <ResponsiveContainer
        width="100%"
        height={hasTitle ? '90%' : '100%'}
      >
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