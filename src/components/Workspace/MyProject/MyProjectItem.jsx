import React from 'react';

import './MyProjectItem.css';

export default function MyProjectItem({ id, title, updatedAt, type, previewImg }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="workspace-my-project-item">
      <div className="workspace-my-project-item__thumbnail-wrapper">
        {previewImg ? (
          <img 
            src={previewImg} 
            alt={title} 
            className="workspace-my-project-item__thumbnail" 
          />
        ) : (
          <div className="workspace-my-project-item__thumbnail-placeholder">
            📊 NO IMAGE
          </div>
        )}
        <span className="workspace-my-project-item__badge">
          {type}
        </span>
      </div>

      <div className="workspace-my-project-item__info">
        <h3 className="workspace-my-project-item__title" title={title}>
          {title}
        </h3>
        <p className="workspace-my-project-item__date">
          최근 수정: {formatDate(updatedAt)}
        </p>
      </div>
    </div>
  );
}