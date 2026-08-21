import './WorkspaceHeader.css';

export default function WorkspaceHeader() {
  return (
    <header className="workspace-header">
      {/* 화면 타이틀 */}
      <h1 className="workspace-header__title">내 프로젝트</h1>

      {/* 우측 검색창 및 버튼 정렬 박스 */}
      <div className="workspace-header__controls">
        <div className="workspace-header__search-container">
          <span className="workspace-header__search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="프로젝트 검색..." 
            className="workspace-header__search-input"
          />
        </div>
        <button type="button" className="workspace-header__create-button">
          <span className="workspace-header__btn-icon">+</span> 새 시각화
        </button>
      </div>
    </header>
  );
}
