import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import PostForm from '../components/PostForm';

export default function CreatePost() {
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const handleCreate = (data) => {
    addPost(data.title, data.content, data.image);
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="center-content" style={{maxWidth: '800px', width: '100%'}}>
        <PostForm onSubmit={handleCreate} />
        
        {/* Tips Section */}
        <div className="card" style={{marginTop: '2rem'}}>
          <h3 style={{fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center'}}>
            <span>💡</span>
            <span>Tips for a Great Post</span>
          </h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#666'}}>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
              <span style={{color: '#22c55e'}}>✓</span>
              <span>Use a clear, descriptive title that summarizes your post</span>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
              <span style={{color: '#22c55e'}}>✓</span>
              <span>Include relevant details and context in your content</span>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
              <span style={{color: '#22c55e'}}>✓</span>
              <span>Add images to make your post more engaging</span>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
              <span style={{color: '#22c55e'}}>✓</span>
              <span>Be respectful and follow community guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
