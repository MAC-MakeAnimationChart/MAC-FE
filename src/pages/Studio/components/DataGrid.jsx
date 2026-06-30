  import { useState } from 'react';

export default function DataGrid({ headers, rows, onHeadersChange, onRowsChange }) {
  const [transposed, setTransposed] = useState(false);

  function addRow() {
    onRowsChange([...rows, Array(headers.length).fill('')]);
  }

  function addColumn() {
    onHeadersChange([...headers, `열 ${headers.length + 1}`]);
    onRowsChange(rows.map((row) => [...row, '']));
  }

  function deleteRow(rowIdx) {
    onRowsChange(rows.filter((_, index) => index !== rowIdx));
  }

  function deleteColumn(colIdx) {
    if (headers.length <= 1) {
      alert('최소 1개의 열은 남아 있어야 합니다.');
      return;
    }

    onHeadersChange(headers.filter((_, index) => index !== colIdx));
    onRowsChange(rows.map((row) => row.filter((_, index) => index !== colIdx)));
  }

  function transposeData() {
  if (rows.length === 0) return;

  if (transposed) {
    const restoredHeaders = rows.map((row) => row[0]);
    const restoredRows = headers.slice(1).map((_, rowIdx) =>
      rows.map((row) => row[rowIdx + 1] ?? '')
    );

    onHeadersChange(restoredHeaders);
    onRowsChange(restoredRows);
    setTransposed(false);
    return;
  }

  const newHeaders = ['구분', ...rows.map((_, i) => `행 ${i + 1}`)];
  const newRows = headers.map((header, colIdx) => [
    header,
    ...rows.map((row) => row[colIdx] ?? ''),
  ]);

  onHeadersChange(newHeaders);
  onRowsChange(newRows);
  setTransposed(true);
}

  function handleCellChange(rowIdx, colIdx, value) {
    onRowsChange(
      rows.map((row, ri) =>
        ri === rowIdx
          ? row.map((cell, ci) => (ci === colIdx ? value : cell))
          : row
      )
    );
  }

  function isDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  function isNumber(value) {
    return value !== '' && !isNaN(Number(value.replace(/,/g, '')));
  }

  return (
    <section className="st-grid-container">
      <div className="st-grid-toolbar">
        <h4 className="st-grid-title">⚙️ 데이터 정제 및 스마트 타입 검증기</h4>

        <div className="st-grid-actions">
          <button className="st-grid-btn accent" onClick={transposeData}>
            {transposed ? '↩ 원래대로' : '🔄 행/열 바꾸기'}
          </button>
          <button className="st-grid-btn" onClick={addRow}>
            ➕ 행 추가
          </button>
          <button className="st-grid-btn" onClick={addColumn}>
            ➕ 열 추가
          </button>
        </div>
      </div>

      <div className="st-table-scroll-wrapper">
        <table className="st-spreadsheet">
          <thead>
            <tr>
              {headers.map((header, colIdx) => (
                <th key={colIdx} className="st-th">
                  <div className="st-th-content">
                    <span>{header}</span>
                    <button
                      type="button"
                      className="st-delete-btn"
                      onClick={() => deleteColumn(colIdx)}
                      aria-label={`${header} 열 삭제`}
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
              <th className="st-th st-row-delete-header">행 삭제</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className={`st-td ${isDate(cell) ? 'font-date' : ''} ${
                      isNumber(cell) ? 'font-number' : ''
                    } ${cell === '' ? 'cell-empty-danger' : ''}`}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(event) =>
                        handleCellChange(rowIdx, colIdx, event.target.value)
                      }
                      style={{
                        background: 'transparent',
                        border: 'none',
                        width: '100%',
                        outline: 'none',
                        color: 'inherit',
                        fontWeight: 'inherit',
                      }}
                    />
                  </td>
                ))}

                <td className="st-td st-row-delete-cell">
                  <button
                    type="button"
                    className="st-delete-btn st-delete-btn--row"
                    onClick={() => deleteRow(rowIdx)}
                    aria-label={`${rowIdx + 1}번째 행 삭제`}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="st-type-legend">
        <span className="st-leg-item">
          <span className="st-leg-color date"></span> 초록색: 날짜 구조 감지
        </span>
        <span className="st-leg-item">
          <span className="st-leg-color number"></span> 파란색: 수치 정보 유형 감지
        </span>
        <span className="st-leg-item">
          <span className="st-leg-color empty"></span> 빨간테두리: 공백 유실값 경고
        </span>
      </div>
    </section>
  );
}