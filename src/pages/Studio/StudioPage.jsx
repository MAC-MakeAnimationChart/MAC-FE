import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DataGrid from './components/DataGrid';
import ChartCanvas from './components/ChartCanvas';
import AiInsightPanel from './components/AiInsightPanel';
import './StudioPage.css';

const INITIAL_HEADERS = ['구분', '분기 데이터', '수치 지표 (매출)', '비고'];
const INITIAL_ROWS = [
  ['2026-03-01', '1분기정산', '15800000', '정상 반영'],
  ['2026-06-01', '2분기정산', '24500000', ''],
  ['2026-09-01', '3분기정산', '19200000', '누락 데이터 보정됨'],
];

export default function StudioPage() {
  const [chartType, setChartType] = useState('bar');
  const [chartConfig, setChartConfig] = useState({
    title: '',
    xKey: '구분',
    yKey: '수치 지표 (매출)',
    theme: 'orange',
  });
  const [headers, setHeaders] = useState(INITIAL_HEADERS);
  const [rows, setRows] = useState(INITIAL_ROWS);

  return (
    <div className="st-container">
      <header className="st-top-navbar">
        <div className="st-navbar-left">
          <Link to="/" className="st-nav-logo">MAC Studio</Link>
          <span className="st-file-status-tag">
            활성화 파일: <code>sales_report_2026.csv</code>
          </span>
        </div>
        <div className="st-navbar-right">
          <button className="st-btn-export-csv">CSV 내보내기</button>
          <button className="st-btn-export-chart">차트 저장</button>
        </div>
      </header>

      <div className="st-workspace-body">
        <Sidebar
          chartType={chartType}
          onChartTypeChange={setChartType}
          chartConfig={chartConfig}
          onChartConfigChange={setChartConfig}
          headers={headers}
        />
        <main className="st-main-viewport">
          <DataGrid
            headers={headers}
            rows={rows}
            onHeadersChange={setHeaders}
            onRowsChange={setRows}
          />
          <section className="st-bottom-preview-split">
            <ChartCanvas
              chartType={chartType}
              chartConfig={chartConfig}
              headers={headers}
              rows={rows}
            />
            <AiInsightPanel />
          </section>
        </main>
      </div>
    </div>
  );
}
