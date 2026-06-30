/**
 * 레이싱 막대 차트 (Bar Race Chart)
 * - 시간 흐름에 따라 막대 순위가 바뀌는 차트
 * - 각 row가 하나의 프레임이고, 재생 버튼을 누르면 1초마다 다음 프레임으로 이동
 * - X축 열 = 시간 레이블, 나머지 열 = 각 항목의 수치
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

import { gridToObjects, numericValue } from '../utils';

import './bar.css';

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948', '#C47FFF', '#F97171'];

function formatNumber(value) {
  if (value === null || value === undefined || value === '') return '';

  const number = Number(value);

  if (Number.isNaN(number)) return value;

  return number.toLocaleString('ko-KR');
}

export default function RacingChart({ headers, rows, chartConfig }) {
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  const xKey = chartConfig.xKey || headers[0];

  const yKeys = useMemo(
    () => headers.filter((header) => header !== xKey),
    [headers, xKey]
  );

  const frames = useMemo(() => {
    return rows.map((row) => {
      const rowObject = gridToObjects(headers, [row])[0] || {};

      return yKeys
        .map((key) => ({
          name: key,
          value: numericValue(rowObject[key]),
        }))
        .filter((item) => !Number.isNaN(item.value))
        .sort((a, b) => b.value - a.value);
    });
  }, [headers, rows, yKeys]);

  useEffect(() => {
    if (frameIdx > frames.length - 1) {
      setFrameIdx(Math.max(frames.length - 1, 0));
    }
  }, [frameIdx, frames.length]);

  useEffect(() => {
    if (!playing || frames.length <= 1) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setFrameIdx((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [playing, frames.length]);

  const currentFrame = frames[frameIdx] ?? [];
  const xKeyIndex = headers.indexOf(xKey);
  const frameLabel = rows[frameIdx]?.[xKeyIndex] ?? '';

  const hasPlayableData = frames.length > 0 && currentFrame.length > 0;

  return (
    <div className="jay-racing-wrapper">
      <div className="jay-racing-chart">
        {hasPlayableData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={currentFrame}
              margin={{ top: 8, right: 72, left: 80, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                type="number"
                tickFormatter={formatNumber}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={75}
              />

              <Tooltip
                formatter={(value) => [formatNumber(value), '값']}
              />

              <Bar
                dataKey="value"
                radius={[0, 8, 8, 0]}
                animationDuration={500}
              >
                {currentFrame.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}

                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={formatNumber}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="jay-racing-empty">
            레이싱 차트로 표시할 수 있는 수치 데이터가 없습니다.
          </div>
        )}
      </div>

      <div className="jay-racing-label">
        {frameLabel || '프레임 데이터 없음'}
      </div>

      <div className="jay-racing-controls">
        <button
          type="button"
          className="jay-racing-btn"
          onClick={() => {
            setFrameIdx(0);
            setPlaying(false);
          }}
          disabled={!hasPlayableData}
        >
          ⏮ 처음
        </button>

        <button
          type="button"
          className={`jay-racing-btn ${playing ? 'active' : ''}`}
          onClick={() => setPlaying((prev) => !prev)}
          disabled={!hasPlayableData || frames.length <= 1}
        >
          {playing ? '⏸ 일시정지' : '▶ 재생'}
        </button>

        <button
          type="button"
          className="jay-racing-btn"
          onClick={() => {
            setFrameIdx(Math.max(frames.length - 1, 0));
            setPlaying(false);
          }}
          disabled={!hasPlayableData}
        >
          끝 ⏭
        </button>
      </div>
    </div>
  );
}