/**
 * 산점도 (Scatter Chart)
 * - X축과 Y축 모두 숫자값으로, 두 변수 간의 상관관계를 점으로 표현
 * - "X가 커질수록 Y도 커지는가?" 같은 관계 파악에 사용
 * - ⚠️ 주의: X축도 숫자여야 의미있음 (날짜 문자열은 0으로 변환됨)
 *
 * 예시:
 *   공부시간 | 시험점수
 *      2    |   60     ← (2, 60) 위치에 점
 *      4    |   75
 *      6    |   88
 */
import {
  ScatterChart as RechartsScatter, // recharts의 ScatterChart를 이름 충돌 없이 사용
  Scatter,                          // 실제 점(scatter)을 그리는 컴포넌트
  XAxis,
  YAxis,
  ZAxis,    // 점의 크기를 결정하는 Z축 (여기선 고정 크기로 사용)
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { gridToObjects, numericValue } from '../utils';

export default function ScatterChart({ headers, rows, chartConfig }) {
  // 산점도는 X, Y 모두 숫자로 변환해서 { x, y } 형태로 전달
  const data = gridToObjects(headers, rows).map(row => ({
    x: numericValue(row[chartConfig.xKey]),
    y: numericValue(row[chartConfig.yKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsScatter margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* type="number": 숫자 스케일로 축 설정 (기본값 category와 다름) */}
        <XAxis dataKey="x" name={chartConfig.xKey} type="number" />
        <YAxis dataKey="y" name={chartConfig.yKey} type="number" />
        {/* ZAxis range: 점 크기를 60px로 고정 (최소~최대 동일하게) */}
        <ZAxis range={[60, 60]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#54C97B" />
      </RechartsScatter>
    </ResponsiveContainer>
  );
}
