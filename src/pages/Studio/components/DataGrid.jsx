import { useState } from 'react';

export default function DataGrid({ headers, rows, onHeadersChange, onRowsChange }) {
  const [transposed, setTransposed] = useState(false);

  function addRow() {
    onRowsChange([...rows, Array(headers.length).fill('')]);
  }

  function addColumn() {
    onHeadersChange([...headers, `열 ${headers.length + 1}`]);
    onRowsChange(rows.map(row => [...row, '']));
  }

  function transposeData() {
    if (rows.length === 0) return;
    const newHeaders = ['구분', ...rows.map((_, i) => `행 ${i + 1}`)];
    const newRows = headers.map((h, colIdx) => [h, ...rows.map(row => row[colIdx] ?? '')]);
    onHeadersChange(newHeaders);
    onRowsChange(newRows);
    setTransposed(prev => !prev);
  }

  function handleCellChange(rowIdx, colIdx, value) {
    onRowsChange(rows.map((row, ri) =>
      ri === rowIdx ? row.map((cell, ci) => ci === colIdx ? value : cell) : row
    ));
  }

  function isDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value); }
  function isNumber(value) { return value !== '' && !isNaN(Number(value.replace(/,/g, ''))); }

  return (
    <section className="st-grid-container">
      <div className="st-grid-toolbar">
        <h4 className="st-grid-title">⚙️ 데이터 정제 및 스마트 타입 검증기</h4>
        <div className="st-grid-actions">
          <button className="st-grid-btn accent" onClick={transposeData}>
            {transposed ? '↩ 원래대로' : '🔄 행/열 바꾸기'}
          </button>
          <button className="st-grid-btn" onClick={addRow}>➕ 행 추가</button>
          <button className="st-grid-btn" onClick={addColumn}>➕ 열 추가</button>
        </div>
      </div>

      <div className="st-table-scroll-wrapper">
        <table className="st-spreadsheet">
          <thead>
            <tr>
              {headers.map((h, i) => <th key={i} className="st-th">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`st-td ${isDate(cell) ? 'font-date' : ''} ${isNumber(cell) ? 'font-number' : ''} ${cell === '' ? 'cell-empty-danger' : ''}`}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={e => handleCellChange(ri, ci, e.target.value)}
                      style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: 'inherit', fontWeight: 'inherit' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="st-type-legend">
        <span className="st-leg-item"><span className="st-leg-color date"></span> 초록색: 날짜 구조 감지</span>
        <span className="st-leg-item"><span className="st-leg-color number"></span> 파란색: 수치 정보 유형 감지</span>
        <span className="st-leg-item"><span className="st-leg-color empty"></span> 빨간테두리: 공백 유실값 경고</span>
      </div>
    </section>
  );
}
