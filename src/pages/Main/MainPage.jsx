import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dataSourcesApi } from '../../api';
import './MainPage.css';

const DEFAULT_PROJECT_ID = 1;
const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = ['.csv', '.xlsx', '.xls'];

function isAllowedFile(file) {
  const lowerName = file.name.toLowerCase();
  return ALLOWED_FILE_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

export default function MainPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFile(file) {
    if (!file) return;

    if (!isAllowedFile(file)) {
      setUploadStatus('CSV 또는 Excel 파일만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadStatus('20MB 이하 파일만 업로드할 수 있습니다.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('파일을 업로드하는 중입니다.');

    try {
      const source = await dataSourcesApi.createDataSource({
        projectId: DEFAULT_PROJECT_ID,
        sourceType: 'UPLOAD',
        file,
      });

      setUploadStatus(`${source?.fileName || file.name} 업로드가 완료되었습니다.`);
      navigate('/studio');
    } catch (error) {
      setUploadStatus(error.message || '업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    uploadFile(event.dataTransfer.files?.[0]);
  }

  function handleSampleClick() {
    navigate('/studio');
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
            Excel 또는 CSV 파일을 업로드하고 차트 옵션을 서버에 저장해 워크스페이스에서 다시 이어갈 수 있습니다.
          </p>
        </div>

        <section className="mn-upload-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="mn-file-input"
            onChange={(event) => uploadFile(event.target.files?.[0])}
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
            <p className="mn-dropzone-desc">또는 컴퓨터에서 파일 선택</p>
            <span className="mn-file-spec">지원 형식: .xlsx, .xls, .csv</span>
          </div>

          {uploadStatus && (
            <p className={`mn-upload-status${isUploading ? ' mn-upload-status--loading' : ''}`}>
              {uploadStatus}
            </p>
          )}

          <div className="mn-or-divider">
            <span className="mn-line"></span>
            <span className="mn-or-text">또는</span>
            <span className="mn-line"></span>
          </div>

          <div className="mn-sample-box">
            <button className="mn-btn-sample" type="button" onClick={handleSampleClick}>
              샘플 데이터로 바로 체험하기
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
