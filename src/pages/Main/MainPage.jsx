import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainPage.css';

const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = ['.csv', '.xlsx', '.xls'];

function isAllowedFile(file) {
  const lowerName = file.name.toLowerCase();
  return ALLOWED_FILE_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

function formatFileSize(size) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))}KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)}MB`;
}

export default function MainPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');

  function selectFile(file) {
    if (!file) return;

    if (!isAllowedFile(file)) {
      setSelectedFile(null);
      setStatus('CSV 또는 Excel 파일만 선택할 수 있습니다.');
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setSelectedFile(null);
      setStatus('20MB 이하 파일만 선택할 수 있습니다.');
      return;
    }

    setSelectedFile(file);
    setStatus('파일이 선택되었습니다. Studio에서 데이터를 확인하고 차트 옵션을 저장할 때 서버에 저장됩니다.');
  }

  function clearSelectedFile() {
    setSelectedFile(null);
    setStatus('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function openStudioWithFile() {
    if (!selectedFile) {
      setStatus('먼저 확인할 파일을 선택하세요.');
      return;
    }

    navigate('/studio', {
      state: {
        pendingFile: selectedFile,
      },
    });
  }

  function handleDrop(event) {
    event.preventDefault();
    selectFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="mn-container">
      <header className="mn-header">
        <div className="mn-header-left">
          <Link to="/" className="mn-logo">MAC</Link>
          <span className="mn-badge">Beta</span>
        </div>
        <nav className="mn-nav">
          <Link to="/studio" className="mn-nav-item">차트 스튜디오</Link>
          <Link to="/pricing" className="mn-nav-item">요금제</Link>
          <Link to="/login" className="mn-btn-login">로그인</Link>
          <Link to="/signup" className="mn-btn-signup">시작하기</Link>
        </nav>
      </header>

      <main className="mn-hero-section">
        <div className="mn-hero-content">
          <h1 className="mn-main-title">
            데이터 시각화의 새로운 시작, <span className="mn-text-gradient">MAC</span>
          </h1>
          <p className="mn-subtitle">
            파일은 먼저 로컬에서 확인합니다. 서버 저장은 Studio에서 차트 옵션 저장을 누를 때 함께 진행됩니다.
          </p>
        </div>

        <section className="mn-upload-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="mn-file-input"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          <div
            className="mn-dropzone"
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
          >
            <div className="mn-icon-cloud">+</div>
            <h3 className="mn-dropzone-title">Excel 또는 CSV 파일을 여기에 드래그하세요</h3>
            <p className="mn-dropzone-desc">선택만으로는 서버에 저장되지 않습니다.</p>
            <span className="mn-file-spec">지원 형식: .xlsx, .xls, .csv (최대 20MB)</span>
          </div>

          {selectedFile && (
            <div className="mn-selected-file">
              <div>
                <strong>{selectedFile.name}</strong>
                <span>{formatFileSize(selectedFile.size)}</span>
              </div>
              <div className="mn-selected-file__actions">
                <button type="button" className="mn-btn-secondary" onClick={clearSelectedFile}>
                  다시 선택
                </button>
                <button type="button" className="mn-btn-confirm" onClick={openStudioWithFile}>
                  Studio에서 확인
                </button>
              </div>
            </div>
          )}

          {status && <p className="mn-upload-status">{status}</p>}

          <div className="mn-or-divider">
            <span className="mn-line"></span>
            <span className="mn-or-text">또는</span>
            <span className="mn-line"></span>
          </div>

          <div className="mn-sample-box">
            <button className="mn-btn-sample" type="button" onClick={() => navigate('/studio')}>
              샘플 데이터로 바로 체험하기
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
