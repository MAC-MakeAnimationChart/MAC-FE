// ── 제이 담당: 막대 계열 ──
import BarChart from './BarChart';
import GroupedBarChart from './GroupedBarChart';
import StackedBarChart from './StackedBarChart';
import RacingChart from './RacingChart';

// ── 예빈 담당: 비율/형태 계열 ──
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import TreemapChart from './TreemapChart';
import WordCloudChart from './WordCloudChart';

// ── 시윤 담당: 추세/분포 계열 ──
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import ScatterChart from './ScatterChart';
import CardChart from './CardChart';

const chartRegistry = {
  bar:        { label: '막대형 (Bar)',    icon: '📊', component: BarChart },
  groupedBar: { label: '그룹 막대',       icon: '📊', component: GroupedBarChart },
  stackedBar: { label: '누적 막대',       icon: '📊', component: StackedBarChart },
  racing:     { label: 'Flourish 레이싱', icon: '🏎️', component: RacingChart },

  pie:        { label: '파이형 (Pie)',    icon: '🍕', component: PieChart },
  donut:      { label: '도넛형 (Donut)', icon: '🍩', component: DonutChart },
  treemap:    { label: '트리맵',          icon: '🗺️', component: TreemapChart },
  wordCloud:  { label: '워드 클라우드',   icon: '☁️', component: WordCloudChart },

  line:       { label: '선형 (Line)',    icon: '📈', component: LineChart },
  area:       { label: '영역 (Area)',    icon: '📉', component: AreaChart },
  scatter:    { label: '산점도',          icon: '🔵', component: ScatterChart },
  card:       { label: '카드 (KPI)',     icon: '🃏', component: CardChart },
};

export default chartRegistry;
