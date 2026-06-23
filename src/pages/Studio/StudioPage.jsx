import React from 'react';
import { Link } from 'react-router-dom';
import './StudioPage.css';

export default function StudioPage() {
    return (
        <div className="st-container">
            {/* ================= 워크스페이스 최상단 제어 바 ================= */}
            <header className="st-top-navbar">
                <div className="st-navbar-left">
                    <Link to="/" className="st-nav-logo">MAC Studio</Link>
                    <span className="st-file-status-tag">활성화 파일: <code>sales_report_2026.csv</code></span>
                </div>
                <div className="st-navbar-right">
                    {/* 상호작용: 이미지 또는 엑셀 형태로 최종 차트 및 가공 데이터 내보내기 */}
                    <button className="st-btn-export-csv" onClick={/* CSV 다운로드 주석 */ () => { }}>CSV 내보내기</button>
                    <button className="st-btn-export-chart" onClick={/* 차트 이미지 저장 주석 */ () => { }}>차트 저장</button>
                </div>
            </header>

            {/* ================= 메인 작업 영역 분할 레이아웃 ================= */}
            <div className="st-workspace-body">

                {/* 1. 좌측 툴 패널 (Chart Studio 세팅 아코디언) */}
                <aside className="st-sidebar-panel">
                    <div className="st-panel-section">
                        <h3 className="st-panel-heading">1. 차트 유형 결정</h3>
                        <div className="st-chart-type-grid">
                            {/* 상호작용: 클릭 시 선택 차트 타입 state 변경 활성화 */}
                            <button className="st-type-btn active" onClick={/* 바차트 토글 주석 */ () => { }}>📊 막대형 (Bar)</button>
                            <button className="st-type-btn" onClick={/* 라인차트 토글 주석 */ () => { }}>📈 선형 (Line)</button>
                            <button className="st-type-btn" onClick={/* 파이차트 토글 주석 */ () => { }}>🍕 파이형 (Pie)</button>
                            <button className="st-type-btn" onClick={/* 레이싱차트 토글 주석 */ () => { }}>🏎️ Flourish 레이싱</button>
                        </div>
                    </div>

                    <div className="st-panel-section">
                        <h3 className="st-panel-heading">2. 시각화 상세 매핑 옵션</h3>
                        <div className="st-option-form">
                            <div className="st-form-group">
                                <label className="st-form-label">차트 메인 타이틀</label>
                                <input type="text" className="st-form-input" placeholder="차트 제목을 입력하세요" />
                            </div>
                            <div className="st-form-group">
                                <label className="st-form-label">X축 기준열(레이블)</label>
                                <select className="st-form-select">
                                    <option>날짜 / 구분</option>
                                    <option>카테고리</option>
                                </select>
                            </div>
                            <div className="st-form-group">
                                <label className="st-form-label">Y축 지표열(데이터 수치)</label>
                                <select className="st-form-select">
                                    <option>총 매출액</option>
                                    <option>성장률</option>
                                </select>
                            </div>
                            <div className="st-form-group">
                                <label className="st-form-label">차트 테마 컬러팩</label>
                                <select className="st-form-select">
                                    <option>MAC Classic Orange</option>
                                    <option>Indigo Aurora</option>
                                    <option>Deep Emerald</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* 2. 우측 통합 제어 뷰포트 (데이터 그리드 + 시각화 영역) */}
                <main className="st-main-viewport">

                    {/* 상단 파트: 원본 데이터 검증 및 편집 그리드 툴바 */}
                    <section className="st-grid-container">
                        <div className="st-grid-toolbar">
                            <h4 className="st-grid-title">⚙️ 데이터 정제 및 스마트 타입 검증기</h4>
                            <div className="st-grid-actions">
                                {/* 상호작용: 원본 행열 대칭 스왑, 로우 컬럼 동적 인서트 */}
                                <button className="st-grid-btn accent" onClick={/* 행열 뒤집기 기동 주석 */ () => { }}>🔄 행/열 바꾸기</button>
                                <button className="st-grid-btn" onClick={/* 행추가 주석 */ () => { }}>➕ 행 추가</button>
                                <button className="st-grid-btn" onClick={/* 열추가 주석 */ () => { }}>➕ 열 추가</button>
                                <input type="text" className="st-grid-search" placeholder="데이터 검색/필터..." />
                            </div>
                        </div>

                        {/* 실제 스프레드시트 컴포넌트 뼈대 (타입별 지표 가이드 구현) */}
                        <div className="st-table-scroll-wrapper">
                            <table className="st-spreadsheet">
                                <thead>
                                    <tr>
                                        <th className="st-th">구분 (교차 열)</th>
                                        <th className="st-th">분기 데이터</th>
                                        <th className="st-th">수치 지표 (매출)</th>
                                        <th className="st-th">비고 (공백 테스트)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="st-td font-date">2026-03-01</td>
                                        <td className="st-td">1분기정산</td>
                                        <td className="st-td font-number">15,800,000</td>
                                        <td className="st-td">정상 반영</td>
                                    </tr>
                                    <tr>
                                        <td className="st-td font-date">2026-06-01</td>
                                        <td className="st-td">2분기정산</td>
                                        <td className="st-td font-number">24,500,000</td>
                                        {/* 상호작용 공백 셀 예시: 빈칸 검출 시 빨간 테두리 트리거 디자인 반영 */}
                                        <td className="st-td cell-empty-danger"></td>
                                    </tr>
                                    <tr>
                                        <td className="st-td font-date">2026-09-01</td>
                                        <td className="st-td">3분기정산</td>
                                        <td className="st-td font-number">19,200,000</td>
                                        <td className="st-td">누락 데이터 보정됨</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="st-type-legend">
                            <span className="st-leg-item"><span className="st-leg-color date"></span> 초록색: 날짜 구조 감지</span>
                            <span className="st-leg-item"><span className="st-leg-color number"></span> 파란색: 수치 정보 유형 감지</span>
                            <span className="st-leg-item"><span className="st-leg-color empty"></span> 빨간테두리: 공백 유실값 경고</span>
                        </div>
                    </section>

                    {/* 하단 파트: 실시간 차트 드로잉 프리뷰 + AI 요약 인사이트 리포트 */}
                    <section className="st-bottom-preview-split">

                        {/* 차트 실시간 드로잉 보드 */}
                        <div className="st-chart-render-card">
                            <div className="st-card-top-bar">
                                <span className="st-card-tab-title">📊 실시간 시각화 프리뷰 캔버스</span>
                            </div>
                            {/* 차트 인스턴스 주입 프레임워크 뼈대 */}
                            <div className="st-canvas-zone">
                                <div className="st-mock-chart-graphic">
                                    {/* 차트 그래픽 바 플롯 데이터 렌더 데모 */}
                                    <div className="st-mock-bar" style={{ height: '40%' }}></div>
                                    <div className="st-mock-bar" style={{ height: '85%' }}></div>
                                    <div className="st-mock-bar" style={{ height: '65%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* AI 스마트 데이터 요약 리포트 패널 */}
                        <div className="st-ai-insight-card">
                            <div className="st-card-top-bar">
                                <span className="st-card-tab-title">🤖 AI Smart 데이터 분석 인사이트</span>
                                <button className="st-btn-regenerate-ai" onClick={/* AI 엔진 재호출 주석 */ () => { }}>새로고침</button>
                            </div>
                            <div className="st-insight-content">
                                <p className="st-insight-p">
                                    🚀 <strong>데이터 패턴 분석 보고:</strong> 업로드된 매출 데이터 세트에서 <strong>2분기정산</strong> 시점에 최대 매출 피크(24,500,000)가 검출되었습니다. 직전 구간 대비 평균 55% 급성장한 수치입니다.
                                </p>
                                <p className="st-insight-p">
                                    ⚠️ <strong>이상치 가이드:</strong> 비고 행의 2번째 인덱스 열에서 공백 유실값이 식별되어 자동 보정 레이어가 할당되었습니다. 시각화 그래프 왜곡을 막기 위해 연산 제외 처리를 추천합니다.
                                </p>
                            </div>
                        </div>

                    </section>

                </main>
            </div>
        </div>
    );
}