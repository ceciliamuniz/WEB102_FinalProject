import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getUpvoteColor = (upvotes) => {
    if (upvotes >= 10) return {color: '#059669', background: '#ecfdf5'};
    if (upvotes >= 5) return {color: '#2563eb', background: '#eff6ff'};
    return {color: '#4b5563', background: '#f9fafb'};
  };

  return (
    <div 
      className="card" 
      style={{
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
      }}
    >
      <Link to={`/post/${post.id}`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
        <div style={{padding: '1.5rem'}}>
          {/* Header */}
          <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <div style={{flex: 1}}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '0.5rem',
                lineHeight: '1.4',
                transition: 'color 0.2s ease'
              }}>
                {post.title}
              </h2>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#6b7280'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                  <span>📅</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                  <span>👤</span>
                  <span>Anonymous</span>
                </div>
              </div>
            </div>
            
            <div style={{
              ...getUpvoteColor(post.upvotes),
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span>👍</span>
              <span>{post.upvotes}</span>
            </div>
          </div>

          {/* Content Preview */}
          {post.content && (
            <p style={{
              color: '#4b5563',
              marginBottom: '1rem',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {post.content}
            </p>
          )}

          {/* Image Preview */}
          {post.image && (
            <div style={{marginBottom: '1rem', borderRadius: '0.5rem', overflow: 'hidden'}}>
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '12rem',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>
          )}

          {/* Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid #f3f4f6'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#6b7280'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <span>💬</span>
                <span>0 comments</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <span>👁️</span>
                <span>{Math.floor(Math.random() * 50) + 1} views</span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#2563eb',
              fontWeight: '500',
              fontSize: '0.85rem',
              transition: 'color 0.2s ease'
            }}>
              <span>Read more</span>
              <span style={{marginLeft: '0.25rem', transition: 'transform 0.2s ease'}}>→</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
