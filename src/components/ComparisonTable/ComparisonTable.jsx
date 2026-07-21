import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import './ComparisonTable.css';

// 비교표 데이터 — 카테고리별로 그룹핑
const COMPARISON_ROWS = [
    {
        category: '시각화',
        rows: [
            { name: '프로젝트 수', values: ['3개', '무제한', '무제한', '무제한'] },
            { name: '파일 크기', values: ['5 MB', '50 MB', '200 MB', '맞춤'] },
            { name: '차트 유형', values: ['8종', '8종', '8종 + 커스텀', '전체'] },
        ],
    },
    {
        category: '내보내기',
        rows: [
            { name: 'PNG', values: ['✓', '✓', '✓', '✓'] },
            { name: 'SVG · PDF', values: ['—', '✓', '✓', '✓'] },
            { name: 'URL 공유 · 임베드', values: ['—', '—', '✓', '✓'] },
        ],
    },
];

const PLAN_HEADERS = ['Free', 'Pro', 'Team', 'Enterprise'];

// ✓ 셀과 — 셀을 구분하는 헬퍼
function CompCell({ value }) {
    const isCheck = value === '✓';
    return (
        <td
            className={`comparison-table__value${isCheck ? ' comparison-table__value--check' : ''}`}
        >
            {value}
        </td>
    );
}

export default function ComparisonTable() {
    return (
        <section className="comparison-table">
            <div className="comparison-table__inner">
                <SectionHeader
                    title="전체 기능 비교"
                    subtitle="각 플랜이 제공하는 기능을 상세히 확인하세요."
                />

                <div className="comparison-table__wrapper">
                    <table className="comparison-table__table">
                        <thead>
                            <tr>
                                <th className="comparison-table__head-blank"></th>
                                {PLAN_HEADERS.map((planName) => (
                                    <th
                                        key={planName}
                                        className="comparison-table__head"
                                    >
                                        {planName}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map(({ category, rows }) => (
                                <React.Fragment key={category}>
                                    <tr>
                                        <td
                                            className="comparison-table__category"
                                            colSpan={PLAN_HEADERS.length + 1}
                                        >
                                            {category}
                                        </td>
                                    </tr>
                                    {rows.map(({ name, values }) => (
                                        <tr key={name}>
                                            <td className="comparison-table__feature-name">
                                                {name}
                                            </td>
                                            {values.map((v, idx) => (
                                                <CompCell key={idx} value={v} />
                                            ))}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

