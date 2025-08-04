import { useState } from 'react';

export default function PostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [image, setImage] = useState(initialData.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit({ title, content, image });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '0.75rem 0.75rem 0 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          margin: '0 0 0.5rem 0'
        }}>
          <span>✏️</span>
          <span>{initialData.title ? 'Edit Post' : 'Create New Post'}</span>
        </h2>
        <p style={{margin: 0, opacity: 0.9}}>Share your thoughts with the community</p>
      </div>

      <form onSubmit={handleSubmit} style={{padding: '0 1.5rem 1.5rem'}}>
        {/* Title Field */}
        <div style={{marginBottom: '1.5rem'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            <span>📝</span>
            <span>Title *</span>
          </label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title..."
            required
          />
          <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', margin: '0.25rem 0 0 0'}}>
            {title.length}/100 characters
          </p>
        </div>

        {/* Content Field */}
        <div style={{marginBottom: '1.5rem'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            <span>📄</span>
            <span>Content</span>
          </label>
          <textarea
            className="form-input"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, experiences, or ask questions..."
            style={{resize: 'vertical', minHeight: '120px'}}
          />
          <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', margin: '0.25rem 0 0 0'}}>
            {content.length} characters
          </p>
        </div>

        {/* Image Field */}
        <div style={{marginBottom: '1.5rem'}}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            <span>🖼️</span>
            <span>Image URL (Optional)</span>
          </label>
          <input
            type="url"
            className="form-input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          
          {/* Image Preview */}
          {image && (
            <div style={{marginTop: '1rem'}}>
              <p style={{fontSize: '0.9rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>Preview:</p>
              <div style={{
                position: 'relative',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}>
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '16rem',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{
                  display: 'none',
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{fontSize: '2.5rem', marginBottom: '0.5rem', display: 'block'}}>❌</span>
                  <p style={{margin: 0}}>Invalid image URL</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: '#6b7280'
          }}>
            <span>💡</span>
            <span>Make sure your post follows community guidelines</span>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minWidth: '140px',
              justifyContent: 'center'
            }}
          >
            {isSubmitting ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>{initialData.title ? 'Update Post' : 'Publish Post'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
