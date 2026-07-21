import './AgreementList.css';

// 약관 항목 정의 — 항목 추가/제거 편하게
const AGREEMENT_ITEMS = [
    { key: 'age', label: '만 14세 이상입니다', required: true },
    { key: 'terms', label: '이용약관 동의', required: true },
    { key: 'privacy', label: '개인정보 처리방침 동의', required: true },
    { key: 'marketing', label: '마케팅 정보 수신 동의', required: false },
];

// 초기 상태 자동 생성
export const initialAgreements = AGREEMENT_ITEMS.reduce(
    (acc, item) => ({ ...acc, [item.key]: false }),
    {}
);

// 필수 항목이 모두 동의됐는지 확인
export function isRequiredAgreed(agreements) {
    return AGREEMENT_ITEMS
        .filter((item) => item.required)
        .every((item) => agreements[item.key]);
}

/**
 * props:
 *  - agreements: { [key]: boolean }
 *  - onChange: (nextAgreements) => void
 *  - showError: boolean — 필수 약관 미동의 에러 표시 여부
 */
export default function AgreementList({ agreements, onChange, showError }) {
    // "전체 동의" 상태 (파생)
    const allChecked = AGREEMENT_ITEMS.every((item) => agreements[item.key]);

    const handleToggleAll = (e) => {
        const next = e.target.checked;
        const nextState = AGREEMENT_ITEMS.reduce(
            (acc, item) => ({ ...acc, [item.key]: next }),
            {}
        );
        onChange(nextState);
    };

    const handleToggleOne = (key) => (e) => {
        onChange({ ...agreements, [key]: e.target.checked });
    };

    return (
        <div className="agreement-list">
            <label className="agreement-list__checkbox agreement-list__checkbox--all">
                <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleToggleAll}
                />
                <span>전체 동의</span>
            </label>

            {AGREEMENT_ITEMS.map((item) => (
                <label key={item.key} className="agreement-list__checkbox">
                    <input
                        type="checkbox"
                        checked={agreements[item.key]}
                        onChange={handleToggleOne(item.key)}
                    />
                    <span>
                        {item.label} {item.required ? '(필수)' : '(선택)'}
                    </span>
                </label>
            ))}

            {showError && (
                <p className="agreement-list__error" role="alert">
                    필수 약관에 동의해주세요.
                </p>
            )}
        </div>
    );
}
