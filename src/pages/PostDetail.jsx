import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import CommentSection from '../components/CommentSection';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, upvotePost, addComment, deletePost } = usePosts();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="page-container">
        <div className="center-content">
          <div className="card" style={{maxWidth: '400px', textAlign: 'center', padding: '3rem'}}>
            <span style={{fontSize: '4rem', marginBottom: '1rem', display: 'block'}}>❓</span>
            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem'}}>Post Not Found</h2>
            <p style={{color: '#666', marginBottom: '1.5rem'}}>The post you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="page-container">
      <div className="center-content" style={{maxWidth: '800px', width: '100%', alignItems: 'flex-start'}}>
        {/* Main Post Card */}
        <article className="card" style={{marginBottom: '2rem', width: '100%'}}>
          {/* Post Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '1.5rem',
            color: 'white',
            borderRadius: '0.75rem 0.75rem 0 0'
          }}>
            <h1 style={{fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.3'}}>
              {post.title}
            </h1>
            <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.9rem', opacity: 0.9}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <span>📅</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <span>👤</span>
                <span>Anonymous</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                <span>👁️</span>
                <span>{Math.floor(Math.random() * 100) + 1} views</span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div style={{padding: '1.5rem'}}>
            {/* Image */}
            {post.image && (
              <div style={{marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden'}}>
                <img 
                  src={post.image} 
                  alt="Post" 
                  style={{
                    width: '100%',
                    maxHeight: '24rem',
                    objectFit: 'contain',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            {post.content && (
              <div style={{marginBottom: '1.5rem'}}>
                <p style={{
                  color: '#374151',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {post.content}
                </p>
              </div>
            )}

            {/* Engagement Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                onClick={() => upvotePost(post.id)}
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem'
                }}
              >
                <span>👍</span>
                <span>Upvote ({post.upvotes})</span>
              </button>

              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Link 
                  to={`/edit/${post.id}`} 
                  className="btn"
                  style={{
                    background: '#f59e0b',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 0.8rem',
                    textDecoration: 'none',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>✏️</span>
                  <span>Edit</span>
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="btn"
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="card" style={{width: '100%'}}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              margin: 0
            }}>
              <span>💬</span>
              <span>Comments ({post.comments?.length || 0})</span>
            </h2>
          </div>
          <CommentSection 
            comments={post.comments} 
            onAddComment={(text) => addComment(post.id, text)} 
          />
        </div>
      </div>
    </div>
  );
}
