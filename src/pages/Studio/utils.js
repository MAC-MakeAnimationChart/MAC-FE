// headers(string[]) + rows(string[][]) → [{ col1: val, col2: val, ... }]
export function gridToObjects(headers, rows) {
  return rows.map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i] ?? '']))
  );
}

// 쉼표 제거 후 숫자 변환 (실패 시 0)
export function numericValue(value) {
  const n = Number(String(value).replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

// 숫자형 컬럼 헤더만 반환
export function numericKeys(headers, rows) {
  return headers.filter((_, i) =>
    rows.some(row => row[i] !== '' && !isNaN(Number(String(row[i]).replace(/,/g, ''))))
  );
}
