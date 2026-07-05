import { useState } from 'react';
import { Link } from 'react-router-dom';
import { chartOptionsApi } from '../../api';
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

function mergeOptionConfig(currentConfig, incomingConfig) {
  return {
    ...currentConfig,
    ...incomingConfig,
    xKey: incomingConfig.xKey || currentConfig.xKey,
    yKey: incomingConfig.yKey || currentConfig.yKey,
  };
}

export default function StudioPage() {
  const [projectId, setProjectId] = useState('1');
  const [chartType, setChartType] = useState('bar');
  const [chartConfig, setChartConfig] = useState({
    title: '',
    xKey: '구분',
    yKey: '수치 지표 (매출)',
    theme: 'orange',
    width: 900,
    height: 520,
    legendVisible: true,
    legendPosition: 'right',
  });
  const [headers, setHeaders] = useState(INITIAL_HEADERS);
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [apiStatus, setApiStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function loadChartOption() {
    setIsSaving(true);
    setApiStatus('차트 옵션을 불러오는 중입니다.');

    try {
      const option = await chartOptionsApi.getChartOption(projectId);
      const normalized = chartOptionsApi.normalizeChartOptionResponse(option);

      if (normalized) {
        setChartType(normalized.chartType);
        setChartConfig((current) => mergeOptionConfig(current, normalized.chartConfig));
      }

      setApiStatus('차트 옵션을 불러왔습니다.');
    } catch (error) {
      setApiStatus(error.message || '차트 옵션 조회에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  async function createChartOption() {
    setIsSaving(true);
    setApiStatus('차트 옵션을 생성하는 중입니다.');

    try {
      await chartOptionsApi.createChartOption(projectId, chartType);
      setApiStatus('차트 옵션을 생성했습니다.');
    } catch (error) {
      setApiStatus(error.message || '차트 옵션 생성에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  async function saveChartOption() {
    setIsSaving(true);
    setApiStatus('차트 옵션을 저장하는 중입니다.');

    try {
      const payload = chartOptionsApi.buildChartOptionPayload({ chartType, chartConfig });
      await chartOptionsApi.updateChartOption(projectId, payload);
      setApiStatus('차트 옵션을 저장했습니다.');
    } catch (error) {
      setApiStatus(error.message || '차트 옵션 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="st-container">
      <header className="st-top-navbar">
        <div className="st-navbar-left">
          <Link to="/" className="st-nav-logo">MAC Studio</Link>
          <span className="st-file-status-tag">
            활성 파일: <code>sales_report_2026.csv</code>
          </span>
        </div>
        <div className="st-navbar-right">
          <label className="st-project-field">
            Project
            <input
              type="number"
              min="1"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
            />
          </label>
          <button className="st-btn-export-csv" type="button" onClick={loadChartOption} disabled={isSaving}>
            옵션 불러오기
          </button>
          <button className="st-btn-export-csv" type="button" onClick={createChartOption} disabled={isSaving}>
            최초 생성
          </button>
          <button className="st-btn-export-chart" type="button" onClick={saveChartOption} disabled={isSaving}>
            옵션 저장
          </button>
        </div>
      </header>

      {apiStatus && <div className="st-api-status">{apiStatus}</div>}

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
