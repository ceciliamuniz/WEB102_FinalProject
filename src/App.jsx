import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import { PostsProvider } from './context/PostsContext';

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <PostsProvider>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo-section">
              <div className="logo-icon">
                <span>🏋️</span>
              </div>
              <div className="brand-text">
                <h1>GymratClub</h1>
                <p className="brand-tagline">Connect • Share • Inspire</p>
              </div>
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link home">
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <Link to="/create" className="nav-link create">
                <span>✏️</span>
                <span>Create Post</span>
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-grid">
              <div>
                <div className="footer-brand">
                  <span>🏋️</span>
                  <h3>GymratClub</h3>
                </div>
                <p className="footer-description">
                  A community platform where fitness enthusiasts share their workouts, connect with like-minded people, and inspire each other.
                </p>
              </div>
              
              <div className="footer-section">
                <h4>Community</h4>
                <ul className="footer-links">
                  <li><a href="#">Guidelines</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Connect</h4>
                <ul className="footer-links">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Privacy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>
                © 2025 GymratClub. Made with <span className="heart">❤️</span> for the fitness community.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PostsProvider>
    </BrowserRouter>
  );
}
