import { ResponsiveContainer, Treemap } from "recharts";

type RowData =
  | Record<string, string | number | null | undefined>
  | Array<string | number | null | undefined>;

type ChartConfig = {
  nameKey?: string;
  valueKey?: string;
};

type TreemapChartProps = {
  headers?: string[];
  rows?: RowData[];
  chartConfig?: ChartConfig;
};

type TreemapDataItem = {
  name: string;
  value: number;
};

function TreemapChart({ headers = [], rows = [], chartConfig = {} }: TreemapChartProps) {
  const nameKey = chartConfig.nameKey || headers[0];
  const valueKey = chartConfig.valueKey || headers[1];

  const data: TreemapDataItem[] = rows
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
        트리맵 차트를 그릴 수 있는 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "360px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="value"
          nameKey="name"
          aspectRatio={4 / 3}
          stroke="#ffffff"
          fill="#7C3AED"
        />
      </ResponsiveContainer>
    </div>
  );
}

export default TreemapChart;