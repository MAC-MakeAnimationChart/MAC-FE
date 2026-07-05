import { apiRequest } from '../httpClient';

export const CHART_TYPE_BY_UI_KEY = {
  bar: 'BAR',
  racing: 'BAR_RACE',
  groupedBar: 'BAR_GROUPED',
  stackedBar: 'BAR_STACKED',
  line: 'LINE',
  area: 'AREA',
  donut: 'DONUT',
  pie: 'PIE',
  wordCloud: 'WORD_CLOUD',
  card: 'METRIC_CARD',
  treemap: 'TREEMAP',
  scatter: 'SCATTER',
};

export const UI_KEY_BY_CHART_TYPE = Object.fromEntries(
  Object.entries(CHART_TYPE_BY_UI_KEY).map(([uiKey, chartType]) => [chartType, uiKey])
);

function encodeProjectId(projectId) {
  return encodeURIComponent(String(projectId));
}

export function getChartOption(projectId) {
  return apiRequest(`/api/v1/projects/${encodeProjectId(projectId)}/chart-option`);
}

export function createChartOption(projectId, uiChartType) {
  return apiRequest(`/api/v1/projects/${encodeProjectId(projectId)}/chart-option`, {
    method: 'POST',
    body: {
      chartType: CHART_TYPE_BY_UI_KEY[uiChartType] || uiChartType,
    },
  });
}

export function updateChartOption(projectId, option) {
  return apiRequest(`/api/v1/projects/${encodeProjectId(projectId)}/chart-option`, {
    method: 'PUT',
    body: option,
  });
}

export function buildChartOptionPayload({ chartType, chartConfig, sourceId }) {
  const yAxis = Array.isArray(chartConfig.yKey) ? chartConfig.yKey : [chartConfig.yKey].filter(Boolean);
  const styleOption = {
    title: chartConfig.title || '',
    width: Number(chartConfig.width || 900),
    height: Number(chartConfig.height || 520),
    legend: {
      visible: chartConfig.legendVisible ?? true,
      position: chartConfig.legendPosition || 'right',
    },
    colors: chartConfig.colors || ['#FF6B35', '#4F46E5'],
    theme: chartConfig.theme,
    sortOrder: chartConfig.sortOrder || 'none',
    showAverageLine: Boolean(chartConfig.showAverageLine),
  };

  if (sourceId) {
    styleOption.dataSource = {
      sourceId,
    };
  }

  return {
    chartType: CHART_TYPE_BY_UI_KEY[chartType] || chartType,
    dataMapping: {
      xAxis: chartConfig.xKey,
      yAxis,
      groupBy: chartConfig.groupBy || null,
    },
    styleOption,
  };
}

export function normalizeChartOptionResponse(option) {
  if (!option) return null;

  const chartType = option.chartType || option.type;
  const dataMapping = option.dataMapping || {};
  const styleOption = option.styleOption || {};

  return {
    chartType: UI_KEY_BY_CHART_TYPE[chartType] || 'bar',
    chartConfig: {
      title: styleOption.title || '',
      xKey: dataMapping.xAxis || '',
      yKey: Array.isArray(dataMapping.yAxis) ? dataMapping.yAxis[0] : dataMapping.yAxis || '',
      groupBy: dataMapping.groupBy || '',
      theme: styleOption.theme || 'orange',
      width: styleOption.width || 900,
      height: styleOption.height || 520,
      legendVisible: styleOption.legend?.visible ?? true,
      legendPosition: styleOption.legend?.position || 'right',
      colors: styleOption.colors,
      sortOrder: styleOption.sortOrder || 'none',
      showAverageLine: Boolean(styleOption.showAverageLine),
      sourceId: styleOption.dataSource?.sourceId,
    },
  };
}
