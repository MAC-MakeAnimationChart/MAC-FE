import './WorkspacePage.css';

const projects = [
  { title: 'Sales report 2026', type: 'Bar chart', updatedAt: '2026-07-05' },
  { title: 'Customer channel mix', type: 'Donut chart', updatedAt: '2026-07-04' },
  { title: 'Quarterly growth tracker', type: 'Line chart', updatedAt: '2026-07-03' },
];

const templates = [
  { title: 'Marketing dashboard', desc: 'Campaign spend, conversion, and channel charts.' },
  { title: 'Finance summary', desc: 'Revenue, cost, and monthly KPI cards.' },
  { title: 'Survey analysis', desc: 'Responses, segments, and word cloud preview.' },
];

const chartTypes = [
  'Bar', 'Grouped Bar', 'Stacked Bar', 'Racing Bar',
  'Pie', 'Donut', 'Treemap', 'Word Cloud',
  'Line', 'Area', 'Scatter', 'KPI Card',
];

const sectionMeta = {
  projects: {
    eyebrow: 'Workspace',
    title: 'Projects',
    desc: '최근에 만든 시각화 작업을 한 곳에서 확인합니다.',
  },
  templates: {
    eyebrow: 'Workspace',
    title: 'Templates',
    desc: '자주 쓰는 데이터 시각화 구성을 빠르게 시작합니다.',
  },
  charts: {
    eyebrow: 'Workspace',
    title: 'Chart Gallery',
    desc: 'Studio에서 사용할 수 있는 차트 타입을 둘러봅니다.',
  },
  settings: {
    eyebrow: 'Account',
    title: 'Settings',
    desc: '계정, 워크스페이스, 기본 내보내기 옵션을 관리합니다.',
  },
};

function ProjectsView() {
  return (
    <div className="workspace-grid">
      {projects.map((project) => (
        <article className="workspace-card" key={project.title}>
          <div className="workspace-card__preview">
            <span>{project.type}</span>
          </div>
          <div className="workspace-card__body">
            <h3>{project.title}</h3>
            <p>Updated {project.updatedAt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function TemplatesView() {
  return (
    <div className="workspace-grid">
      {templates.map((template) => (
        <article className="workspace-card workspace-card--compact" key={template.title}>
          <h3>{template.title}</h3>
          <p>{template.desc}</p>
          <button type="button">Use template</button>
        </article>
      ))}
    </div>
  );
}

function ChartsView() {
  return (
    <div className="chart-gallery-grid">
      {chartTypes.map((chart) => (
        <div className="chart-gallery-tile" key={chart}>
          <span className="chart-gallery-tile__icon">▦</span>
          <span>{chart}</span>
        </div>
      ))}
    </div>
  );
}

function SettingsView() {
  return (
    <div className="settings-panel">
      <label>
        Display name
        <input type="text" defaultValue="MAC User" />
      </label>
      <label>
        Default export
        <select defaultValue="png">
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="pdf">PDF</option>
        </select>
      </label>
      <label className="settings-panel__toggle">
        <input type="checkbox" defaultChecked />
        Show chart preview warnings
      </label>
    </div>
  );
}

export default function WorkspacePage({ section }) {
  const meta = sectionMeta[section] ?? sectionMeta.projects;

  return (
    <main className="workspace-page">
      <header className="workspace-page__header">
        <p>{meta.eyebrow}</p>
        <h1>{meta.title}</h1>
        <span>{meta.desc}</span>
      </header>

      {section === 'projects' && <ProjectsView />}
      {section === 'templates' && <TemplatesView />}
      {section === 'charts' && <ChartsView />}
      {section === 'settings' && <SettingsView />}
    </main>
  );
}
