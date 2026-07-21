import { useState } from 'react';
import './FormField.css';

/**
 * 폼 필드 재사용 컴포넌트.
 * label + input + (선택) 비밀번호 토글 + error/hint 텍스트.
 *
 * props:
 *  - id, name, type, value, onChange, placeholder, autoComplete, maxLength
 *  - label:  라벨 텍스트 (생략 가능)
 *  - error:  에러 메시지 (있으면 붉은 테두리 + 메시지)
 *  - hint:   힌트 메시지 (error가 없을 때만 표시)
 *  - isPassword: true면 보기/숨기기 토글 버튼 추가
 */
export default function FormField({
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    autoComplete,
    maxLength,
    label,
    error,
    hint,
    isPassword = false,
}) {
    const [visible, setVisible] = useState(false);
    const effectiveType = isPassword ? (visible ? 'text' : 'password') : type;

    const inputClass = [
        'form-field__input',
        isPassword && 'form-field__input--password',
        error && 'form-field__input--error',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="form-field">
            {label && (
                <label className="form-field__label" htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="form-field__control">
                <input
                    className={inputClass}
                    id={id}
                    name={name}
                    type={effectiveType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                />

                {isPassword && (
                    <button
                        type="button"
                        className="form-field__toggle"
                        aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
                        onClick={() => setVisible((prev) => !prev)}
                    >
                        {visible ? '숨기기' : '보기'}
                    </button>
                )}
            </div>

            {error
                ? <p className="form-field__error">{error}</p>
                : hint && <p className="form-field__hint">{hint}</p>}
        </div>
    );
}
