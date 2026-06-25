import chartRegistry from '../charts';

export default function Sidebar({ chartType, onChartTypeChange, chartConfig, onChartConfigChange, headers }) {
  return (
    <aside className="st-sidebar-panel">
      <div className="st-panel-section">
        <h3 className="st-panel-heading">1. 차트 유형 결정</h3>
        <div className="st-chart-type-grid">
          {Object.entries(chartRegistry).map(([key, { label, icon }]) => (
            <button
              key={key}
              className={`st-type-btn ${chartType === key ? 'active' : ''}`}
              onClick={() => onChartTypeChange(key)}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      <div className="st-panel-section">
        <h3 className="st-panel-heading">2. 시각화 상세 매핑 옵션</h3>
        <div className="st-option-form">
          <div className="st-form-group">
            <label className="st-form-label">차트 메인 타이틀</label>
            <input
              type="text"
              className="st-form-input"
              placeholder="차트 제목을 입력하세요"
              value={chartConfig.title}
              onChange={e => onChartConfigChange({ ...chartConfig, title: e.target.value })}
            />
          </div>

          <div className="st-form-group">
            <label className="st-form-label">X축 기준열(레이블)</label>
            <select
              className="st-form-select"
              value={chartConfig.xKey}
              onChange={e => onChartConfigChange({ ...chartConfig, xKey: e.target.value })}
            >
              {headers.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div className="st-form-group">
            <label className="st-form-label">Y축 지표열(데이터 수치)</label>
            <select
              className="st-form-select"
              value={chartConfig.yKey}
              onChange={e => onChartConfigChange({ ...chartConfig, yKey: e.target.value })}
            >
              {headers.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div className="st-form-group">
            <label className="st-form-label">막대 정렬</label>
            <select
              className="st-form-select"
              value={chartConfig.sortOrder || 'none'}
              onChange={e => onChartConfigChange({ ...chartConfig, sortOrder: e.target.value })}
            >
              <option value="none">원본 순서</option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>

          <div className="st-form-group">
            <label className="st-form-label">평균선 표시</label>
            <select
              className="st-form-select"
              value={chartConfig.showAverageLine ? 'on' : 'off'}
              onChange={e =>
                onChartConfigChange({
                  ...chartConfig,
                  showAverageLine: e.target.value === 'on',
                })
              }
            >
              <option value="on">표시</option>
              <option value="off">숨김</option>
            </select>
          </div>

          <div className="st-form-group">
            <label className="st-form-label">차트 테마 컬러팩</label>
            <select
              className="st-form-select"
              value={chartConfig.theme}
              onChange={e => onChartConfigChange({ ...chartConfig, theme: e.target.value })}
            >
              <option value="orange">MAC Classic Orange</option>
              <option value="indigo">Indigo Aurora</option>
              <option value="emerald">Deep Emerald</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
}