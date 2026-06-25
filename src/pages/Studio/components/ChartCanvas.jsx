import chartRegistry from '../charts';

export default function ChartCanvas({ chartType, chartConfig, headers, rows }) {
  const entry = chartRegistry[chartType];
  const ChartComponent = entry?.component;

  return (
    <div className="st-chart-render-card">
      <div className="st-card-top-bar">
        <span className="st-card-tab-title">📊 실시간 시각화 프리뷰 캔버스</span>
        {chartConfig.title && (
          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{chartConfig.title}</span>
        )}
      </div>
      <div className="st-canvas-zone">
        {ChartComponent
          ? <ChartComponent headers={headers} rows={rows} chartConfig={chartConfig} />
          : <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>차트 유형을 선택하세요</span>
        }
      </div>
    </div>
  );
}
