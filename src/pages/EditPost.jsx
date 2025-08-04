import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, editPost } = usePosts();

  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-lg border border-white/20 max-w-md mx-auto">
              <span className="text-6xl mb-4 block">❓</span>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
              <p className="text-gray-600 mb-6">The post you're trying to edit doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = (data) => {
    editPost(id, data.title, data.content, data.image);
    navigate(`/post/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto p-6">
        <PostForm
          initialData={{ title: post.title, content: post.content, image: post.image }}
          onSubmit={handleEdit}
        />
        
        {/* Warning Section */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center space-x-2">
            <span>⚠️</span>
            <span>Important Notes</span>
          </h3>
          <div className="text-sm text-amber-700 space-y-2">
            <p>• Changes will be saved immediately after clicking "Update Post"</p>
            <p>• Make sure all information is accurate before submitting</p>
            <p>• You can cancel editing by navigating back to the post</p>
          </div>
        </div>
      </div>
    </div>
  );
}
