type RowData =
  | Record<string, string | number | null | undefined>
  | Array<string | number | null | undefined>;

type ChartConfig = {
  nameKey?: string;
  valueKey?: string;
};

type WordCloudChartProps = {
  headers?: string[];
  rows?: RowData[];
  chartConfig?: ChartConfig;
};

type WordDataItem = {
  name: string;
  value: number;
};

const COLORS = ["#7C3AED", "#2563EB", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];

function WordCloudChart({ headers = [], rows = [], chartConfig = {} }: WordCloudChartProps) {
  const nameKey = chartConfig.nameKey || headers[0];
  const valueKey = chartConfig.valueKey || headers[1];

  const data: WordDataItem[] = rows
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
        워드클라우드 차트를 그릴 수 있는 데이터가 없습니다.
      </div>
    );
  }

  const values = data.map((item) => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getFontSize = (value: number) => {
    if (maxValue === minValue) return 28;

    const minSize = 16;
    const maxSize = 48;
    const ratio = (value - minValue) / (maxValue - minValue);

    return Math.round(minSize + ratio * (maxSize - minSize));
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "360px",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        boxSizing: "border-box",
      }}
    >
      {data.map((item, index) => (
        <span
          key={`${item.name}-${index}`}
          title={`${item.name}: ${item.value}`}
          style={{
            fontSize: `${getFontSize(item.value)}px`,
            fontWeight: 700,
            color: COLORS[index % COLORS.length],
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}

export default WordCloudChart;