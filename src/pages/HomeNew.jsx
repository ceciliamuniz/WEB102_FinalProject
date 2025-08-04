import { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';

export default function Home() {
  const { posts } = usePosts();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'upvotes'

  // Filter posts by search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort posts
  filteredPosts.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Welcome to GymratClub
        </h1>
        <p className="hero-subtitle">
          Share your fitness journey, connect with fellow gym enthusiasts, and discover amazing workout content from our community
        </p>
      </div>

      {/* Stats Bar */}
      <div className="stats-grid">
        <div className="stat-card">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
            <div style={{background: 'rgba(102, 126, 234, 0.1)', padding: '0.75rem', borderRadius: '50%'}}>
              <span style={{fontSize: '1.5rem'}}>📝</span>
            </div>
            <div>
              <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#333', margin: 0}}>{posts.length}</p>
              <p style={{color: '#666', margin: 0}}>Total Posts</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
            <div style={{background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '50%'}}>
              <span style={{fontSize: '1.5rem'}}>👍</span>
            </div>
            <div>
              <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#333', margin: 0}}>
                {posts.reduce((total, post) => total + post.upvotes, 0)}
              </p>
              <p style={{color: '#666', margin: 0}}>Total Upvotes</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
            <div style={{background: 'rgba(147, 51, 234, 0.1)', padding: '0.75rem', borderRadius: '50%'}}>
              <span style={{fontSize: '1.5rem'}}>🔥</span>
            </div>
            <div>
              <p style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#333', margin: 0}}>
                {posts.filter(post => post.upvotes > 0).length}
              </p>
              <p style={{color: '#666', margin: 0}}>Popular Posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="card" style={{maxWidth: '800px', margin: '2rem auto'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
          <div style={{position: 'relative', width: '100%', maxWidth: '500px'}}>
            <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}}>
              <span style={{color: '#999', fontSize: '1.2rem'}}>🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search posts by title..."
              className="form-input"
              style={{paddingLeft: '3rem', textAlign: 'center'}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div>
              <select
                className="form-input"
                style={{padding: '0.75rem 1rem', minWidth: '150px', textAlign: 'center'}}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">📅 Sort by Newest</option>
                <option value="upvotes">🔥 Sort by Upvotes</option>
              </select>
            </div>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="btn"
                style={{background: '#f3f4f6', color: '#666', padding: '0.5rem 1rem'}}
              >
                <span>✕ Clear</span>
              </button>
            )}
          </div>
        </div>
        
        {searchTerm && (
          <div style={{marginTop: '1rem', color: '#666', fontSize: '0.9rem'}}>
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="center-content" style={{padding: '4rem 0'}}>
          <div className="card" style={{maxWidth: '400px'}}>
            <span style={{fontSize: '4rem', marginBottom: '1rem', display: 'block'}}>📭</span>
            <h3 style={{fontSize: '1.5rem', color: '#333', margin: '0 0 1rem 0'}}>No posts found</h3>
            <p style={{color: '#666', margin: 0}}>
              {searchTerm ? `Try adjusting your search term "${searchTerm}"` : 'Be the first to create a post!'}
            </p>
          </div>
        </div>
      ) : (
        <div className="content-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
