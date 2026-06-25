import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

export default function MainPage() {
    return (
        <div className="mn-container">
            {/* ================= 글로벌 상단 네비게이션 헤더 ================= */}
            <header className="mn-header">
                <div className="mn-header-left">
                    <Link to="/" className="mn-logo">MAC</Link>
                    <span className="mn-badge">Beta</span>
                </div>
                <nav className="mn-nav">
                    <Link to="/studio" className="mn-nav-item">차트 스튜디오</Link>
                    <Link to="/login" className="mn-btn-login">로그인</Link>
                    <Link to="/signup" className="mn-btn-signup">시작하기</Link>
                </nav>
            </header>

            {/* ================= 메인 히어로 섹션 ================= */}
            <main className="mn-hero-section">
                <div className="mn-hero-content">
                    <h1 className="mn-main-title">
                        데이터 시각화의 새로운 표준, <span className="mn-text-gradient">MAC</span>
                    </h1>
                    <p className="mn-subtitle">
                        비전공자도 3초 만에 만드는 프로페셔널 차트. 데이터를 업로드하고 정제부터 시각화, AI 인사이트 도출까지 한 번에 끝내세요.
                    </p>
                </div>

                {/* ================= 핵심 파일 드롭존 영역 ================= */}
                <section className="mn-upload-wrap">
                    {/* 상호작용: 클릭 시 파일 탐색기 트리거 / 드래그 앤 드롭 이벤트 바인딩 구역 */}
                    <div className="mn-dropzone" onClick={/* 파일 선택창 오픈 함수 링크 */ () => { }}>
                        <div className="mn-icon-cloud">⚡</div>
                        <h3 className="mn-dropzone-title">Excel 또는 CSV 파일을 여기에 드래그하세요</h3>
                        <p className="mn-dropzone-desc">또는 컴퓨터에서 파일 선택</p>
                        <span className="mn-file-spec">지원 형식: .xlsx, .xls, .csv (최대 20MB)</span>
                    </div>

                    <div className="mn-or-divider">
                        <span className="mn-line"></span>
                        <span className="mn-or-text">또는</span>
                        <span className="mn-line"></span>
                    </div>

                    {/* 상호작용: 클릭 시 샘플 데이터를 적재하고 /studio 워크스페이스로 강제 이동 */}
                    <div className="mn-sample-box">
                        <button className="mn-btn-sample" onClick={/* 샘플 데이터 로드 및 이동 기능 주석 */ () => { }}>
                            💡 샘플 데이터로 3초 만에 체험하기
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}