import { useState } from 'react';

export default function CommentSection({ comments, onAddComment }) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAddComment(commentText);
      setCommentText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.ceil(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div style={{padding: '1.5rem'}}>
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} style={{marginBottom: '2rem'}}>
        <div style={{
          background: '#f9fafb',
          borderRadius: '0.5rem',
          padding: '1rem',
          border: '1px solid #e5e7eb'
        }}>
          <textarea
            className="form-input"
            rows="4"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts on this post..."
            disabled={isSubmitting}
            style={{
              resize: 'vertical',
              marginBottom: '0.75rem',
              background: 'white'
            }}
          />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: 0
            }}>
              {commentText.length}/500 characters
            </p>
            <button 
              type="submit" 
              disabled={isSubmitting || !commentText.trim()}
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
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <span>💬</span>
                  <span>Add Comment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem 0'}}>
          <span style={{fontSize: '2.5rem', marginBottom: '0.75rem', display: 'block'}}>💭</span>
          <p style={{color: '#6b7280', fontSize: '1.1rem', marginBottom: '0.25rem'}}>No comments yet</p>
          <p style={{color: '#9ca3af', fontSize: '0.9rem', margin: 0}}>Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {comments.map((comment, index) => (
            <div 
              key={comment.id} 
              style={{
                background: '#f9fafb',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}
            >
              {/* Comment Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}>
                    A
                  </div>
                  <div>
                    <p style={{fontWeight: '500', color: '#1f2937', margin: 0, fontSize: '0.9rem'}}>Anonymous</p>
                    <p style={{fontSize: '0.75rem', color: '#6b7280', margin: 0}}>{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                <div style={{fontSize: '0.75rem', color: '#6b7280'}}>
                  <span>#{index + 1}</span>
                </div>
              </div>

              {/* Comment Content */}
              <p style={{
                color: '#374151',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                margin: '0 0 0.75rem 0'
              }}>
                {comment.text}
              </p>

              {/* Comment Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <button style={{
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6b7280';
                }}>
                  <span>👍</span>
                  <span>Like</span>
                </button>
                <button style={{
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6b7280';
                }}>
                  <span>💬</span>
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
