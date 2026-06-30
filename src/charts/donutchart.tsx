import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type RowData =
  | Record<string, string | number | null | undefined>
  | Array<string | number | null | undefined>;

type ChartConfig = {
  nameKey?: string;
  valueKey?: string;
  showLabel?: boolean;
  showLegend?: boolean;
};

type DonutChartProps = {
  headers?: string[];
  rows?: RowData[];
  chartConfig?: ChartConfig;
};

type DonutDataItem = {
  name: string;
  value: number;
};

const COLORS = ["#7C3AED", "#2563EB", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];

function DonutChart({ headers = [], rows = [], chartConfig = {} }: DonutChartProps) {
  const nameKey = chartConfig.nameKey || headers[0];
  const valueKey = chartConfig.valueKey || headers[1];

  const data: DonutDataItem[] = rows
    .map((row) => {
      let name: string | number | null | undefined;
      let value: string | number | null | undefined;

      if (Array.isArray(row)) {
        const nameIndex = headers.indexOf(nameKey);
        const valueIndex = headers.indexOf(valueKey);

        name = row[nameIndex >= 0 ? nameIndex : 0];
        value = row[valueIndex >= 0 ? valueIndex : 1];
      } else {
        name = row[nameKey];
        value = row[valueKey];
      }

      return {
        name: String(name ?? ""),
        value: Number(value),
      };
    })
    .filter((item) => item.name.trim() !== "" && !Number.isNaN(item.value));

  if (!nameKey || !valueKey || data.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
          fontSize: "14px",
        }}
      >
        도넛 차트를 그릴 수 있는 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "360px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            label={chartConfig.showLabel ?? true}
          >
            {data.map((item, index) => (
              <Cell key={`${item.name}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          {(chartConfig.showLegend ?? true) && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonutChart;