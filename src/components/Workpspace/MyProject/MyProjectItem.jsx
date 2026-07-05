function MyProjectItem({ id, title, updatedAt, type, previewImg }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
            {previewImg && <img src={previewImg} alt={title} style={{ width: '100px', height: '60px', objectFit: 'cover' }} />}
            <h3>[{id}] {title}</h3>
            <p>유형: {type} | 수정일: {updatedAt}</p>
        </div>
    );
}

export default MyProjectItem;
