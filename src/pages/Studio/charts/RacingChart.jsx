/**
 * 레이싱 막대 차트 (Bar Race Chart)
 * - Flourish의 Bar Race처럼 시간 흐름에 따라 막대가 경쟁하듯 순위가 바뀌는 차트
 * - 각 row가 하나의 "프레임(시간 한 칸)"이고, 재생 버튼을 누르면 1초마다 다음 프레임으로 이동
 * - X축 열 = 시간 레이블(연도/날짜 등), 나머지 열 = 각 항목의 수치
 *
 * 예시 데이터:
 *   연도 | 한국 | 미국 | 일본
 *   2020 |  100 |  300 |  200   ← 1번 프레임
 *   2021 |  150 |  280 |  210   ← 2번 프레임
 *   2022 |  200 |  260 |  220   ← 3번 프레임
 */
import { useState, useEffect, useRef } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell, // 막대 하나하나에 개별 색상을 줄 때 사용
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';
import './bar.css';

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948', '#C47FFF', '#F97171'];

export default function RacingChart({ headers, rows, chartConfig }) {
  const [frameIdx, setFrameIdx] = useState(0);   // 현재 보여줄 프레임 번호 (0 = 첫 번째 row)
  const [playing, setPlaying] = useState(false);  // 재생 중이면 true
  const intervalRef = useRef(null);               // setInterval ID 저장 (cleanup용)

  // X축 열 제외한 나머지 열이 각 "항목(선수)"
  const yKeys = headers.filter(h => h !== chartConfig.xKey);

  // rows 전체를 프레임 배열로 변환
  // 각 프레임 = 항목별 { name, value } 배열, 값 큰 순으로 정렬 → 순위 반영
  const frames = rows.map(row => {
    const obj = gridToObjects([...headers], [row])[0];
    return yKeys
      .map(k => ({ name: k, value: numericValue(obj[k]) }))
      .sort((a, b) => b.value - a.value);
  });

  // playing이 true가 되면 1초마다 frameIdx를 1씩 증가
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setFrameIdx(prev => {
          if (prev >= frames.length - 1) {
            setPlaying(false); // 마지막 프레임 도달 시 자동 정지
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    // 컴포넌트 사라지거나 playing 상태 바뀔 때 인터벌 반드시 제거 (메모리 누수 방지)
    return () => clearInterval(intervalRef.current);
  }, [playing, frames.length]);

  const currentFrame = frames[frameIdx] ?? [];
  // 현재 프레임의 X축 레이블 (연도, 날짜 등)
  const frameLabel = rows[frameIdx]?.[headers.indexOf(chartConfig.xKey)] ?? '';

  return (
    <div className="jay-racing-wrapper">
      {/* layout="vertical": 막대를 가로 방향으로 눕힘 (레이싱 스타일) */}
      <div className="jay-racing-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={currentFrame} margin={{ top: 5, right: 50, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={75} />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {/* Cell로 각 막대에 색상 개별 지정 */}
              {currentFrame.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 현재 프레임 레이블 표시 (연도 등) */}
      <div className="jay-racing-label">{frameLabel}</div>

      {/* 재생/일시정지/처음/끝 컨트롤 */}
      <div className="jay-racing-controls">
        <button className="jay-racing-btn" onClick={() => { setFrameIdx(0); setPlaying(false); }}>⏮ 처음</button>
        <button
          className={`jay-racing-btn ${playing ? 'active' : ''}`}
          onClick={() => setPlaying(p => !p)}
        >
          {playing ? '⏸ 일시정지' : '▶ 재생'}
        </button>
        <button className="jay-racing-btn" onClick={() => { setFrameIdx(frames.length - 1); setPlaying(false); }}>끝 ⏭</button>
      </div>
    </div>
  );
}
