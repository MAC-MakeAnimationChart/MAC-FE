import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { chartOptionsApi, dataSourcesApi } from '../../api';
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

async function parseTabularFile(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: false });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) return null;

  const worksheet = workbook.Sheets[firstSheetName];
  const table = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    blankrows: false,
    defval: '',
  });
  const cleanedRows = table
    .map((row) => row.map((cell) => String(cell ?? '').trim()))
    .filter((row) => row.some((cell) => cell !== ''));

  if (cleanedRows.length < 2) return null;

  return {
    headers: cleanedRows[0].map((header, index) => header || `Column ${index + 1}`),
    rows: cleanedRows.slice(1),
  };
}

function escapeCsvCell(value) {
  const text = String(value ?? '');

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function gridToCsvFile(headers, rows, fileName = 'mac-chart-data.csv') {
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvCell).join(','))
    .join('\r\n');
  const safeName = fileName.toLowerCase().endsWith('.csv')
    ? fileName
    : `${fileName.replace(/\.[^.]+$/, '') || 'mac-chart-data'}.csv`;

  return new File([csv], safeName, { type: 'text/csv;charset=utf-8' });
}

export default function StudioPage() {
  const location = useLocation();
  const pendingFileFromRoute = location.state?.pendingFile || null;
  const [projectId, setProjectId] = useState('1');
  const [pendingFile, setPendingFile] = useState(pendingFileFromRoute);
  const [savedSourceId, setSavedSourceId] = useState(null);
  const [isDataDirty, setIsDataDirty] = useState(Boolean(pendingFileFromRoute));
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
  const [activeEditor, setActiveEditor] = useState('chart');

  useEffect(() => {
    if (!pendingFile) return;

    parseTabularFile(pendingFile).then((parsed) => {
      if (!parsed) {
        setApiStatus('CSV 내용을 읽지 못했습니다. 샘플 데이터로 표시합니다.');
        return;
      }

      setHeaders(parsed.headers);
      setRows(parsed.rows);
      setChartConfig((current) => ({
        ...current,
        xKey: parsed.headers[0] || current.xKey,
        yKey: parsed.headers[1] || current.yKey,
      }));
      setApiStatus('선택한 CSV 데이터를 Studio에서 미리보기로 불러왔습니다. 아직 서버에 저장하지 않았습니다.');
    }).catch(() => {
      setApiStatus('파일 데이터를 읽지 못했습니다. CSV 또는 Excel 파일인지 확인하세요.');
    });
  }, [pendingFile]);

  async function loadChartOption() {
    setIsSaving(true);
    setApiStatus('차트 옵션을 불러오는 중입니다.');

    try {
      const option = await chartOptionsApi.getChartOption(projectId);
      const normalized = chartOptionsApi.normalizeChartOptionResponse(option);

      if (normalized) {
        setChartType(normalized.chartType);
        setChartConfig((current) => mergeOptionConfig(current, normalized.chartConfig));
        setSavedSourceId(normalized.chartConfig.sourceId || null);
        setIsDataDirty(false);
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
      setApiStatus('차트 옵션을 생성했습니다. 데이터 파일은 옵션 저장 시 함께 저장됩니다.');
    } catch (error) {
      setApiStatus(error.message || '차트 옵션 생성에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  async function saveChartOption() {
    setIsSaving(true);
    setApiStatus('데이터 파일과 차트 옵션을 저장하는 중입니다.');

    try {
      let sourceId = savedSourceId;

      if (!sourceId || pendingFile || isDataDirty) {
        const fileForSave = gridToCsvFile(headers, rows, pendingFile?.name);
        const source = await dataSourcesApi.createDataSource({
          projectId: Number(projectId),
          sourceType: 'UPLOAD',
          file: fileForSave,
        });

        sourceId = source?.sourceId;
        setSavedSourceId(sourceId);
      }

      const payload = chartOptionsApi.buildChartOptionPayload({
        chartType,
        chartConfig,
        sourceId,
      });

      await chartOptionsApi.updateChartOption(projectId, payload);
      setPendingFile(null);
      setIsDataDirty(false);
      setApiStatus('데이터 파일과 차트 옵션을 저장했습니다.');
    } catch (error) {
      setApiStatus(error.message || '저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  const pendingFileNotice =
    pendingFile && !pendingFile.name.toLowerCase().endsWith('.csv')
      ? 'Excel 파일은 서버 저장 시 함께 업로드됩니다. 현재 미리보기는 샘플 데이터로 표시됩니다.'
      : '';
  void pendingFileNotice;
  const visibleStatus = apiStatus;
  const handleHeadersChange = (nextHeaders) => {
    setHeaders(nextHeaders);
    setIsDataDirty(true);
  };
  const handleRowsChange = (nextRows) => {
    setRows(nextRows);
    setIsDataDirty(true);
  };

  return (
    <div className="st-container">
      <header className="st-top-navbar">
        <div className="st-navbar-left">
          <Link to="/" className="st-nav-logo">MAC Studio</Link>
          <span className="st-file-status-tag">
            {pendingFile ? '저장 전 파일: ' : '활성 파일: '}
            <code>{pendingFile?.name || 'sales_report_2026.csv'}</code>
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
            데이터와 옵션 저장
          </button>
        </div>
      </header>

      {visibleStatus && <div className="st-api-status">{visibleStatus}</div>}

      <nav className="st-editor-tabs" aria-label="Studio editor views">
        <button
          type="button"
          className={activeEditor === 'chart' ? 'active' : ''}
          onClick={() => setActiveEditor('chart')}
        >
          차트 옵션 수정
        </button>
        <button
          type="button"
          className={activeEditor === 'data' ? 'active' : ''}
          onClick={() => setActiveEditor('data')}
        >
          데이터 수정
        </button>
      </nav>

      <main className="st-workspace-body">
        {activeEditor === 'chart' ? (
          <section className="st-chart-option-layout">
            <div className="st-preview-region">
              <ChartCanvas
                chartType={chartType}
                chartConfig={chartConfig}
                headers={headers}
                rows={rows}
              />
            </div>
            <div className="st-options-region">
              <Sidebar
                chartType={chartType}
                onChartTypeChange={setChartType}
                chartConfig={chartConfig}
                onChartConfigChange={setChartConfig}
                headers={headers}
              />
            </div>
          </section>
        ) : (
          <section className="st-data-editor-layout">
            <DataGrid
              headers={headers}
              rows={rows}
              onHeadersChange={handleHeadersChange}
              onRowsChange={handleRowsChange}
            />
            <AiInsightPanel />
          </section>
        )}
      </main>
    </div>
  );
}
