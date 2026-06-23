/**
 * 워드 클라우드 (Word Cloud)
 * - 수치가 클수록 텍스트가 크게 표시되는 시각화
 * - 외부 라이브러리 없이 CSS flex + 동적 fontSize로 구현
 * - X축 열 = 단어(텍스트), Y축 열 = 크기 결정 수치
 *
 * 예시:
 *   단어  | 빈도
 *   React |  80   ← 가장 크게 표시
 *   Vue   |  40
 *   CSS   |  20   ← 가장 작게 표시
 */
import { gridToObjects, numericValue } from '../utils';
import './circular.css';

const COLORS = ['#FF6B35', '#4F86C6', '#54C97B', '#F7C948', '#C47FFF', '#F97171'];

export default function WordCloudChart({ headers, rows, chartConfig }) {
  const data = gridToObjects(headers, rows).map(row => ({
    text: String(row[chartConfig.xKey] ?? ''),
    value: numericValue(row[chartConfig.yKey] ?? '0'),
  }));

  // 데이터 중 최대값 → 폰트 크기 비율 계산 기준
  const maxVal = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="yebin-wordcloud-wrapper">
      {data.map(({ text, value }, i) => (
        <span
          key={i}
          title={`${text}: ${value}`} // 마우스 올리면 값 표시
          className="yebin-wordcloud-word"
          style={{
            // 최솟값 14px ~ 최댓값 52px 사이로 비례 계산
            fontSize: `${14 + (value / maxVal) * 38}px`,
            color: COLORS[i % COLORS.length],
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
