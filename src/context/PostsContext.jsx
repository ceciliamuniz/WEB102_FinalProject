import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  // Add new post
  const addPost = (title, content = '', image = '') => {
    const newPost = {
      id: uuidv4(),
      title,
      content,
      image,
      upvotes: 0,
      createdAt: new Date().toISOString(),
      comments: [], // comments as objects: {id, text, createdAt}
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // Edit existing post by id
  const editPost = (id, title, content = '', image = '') => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, title, content, image } : post
      )
    );
  };

  // Delete post by id
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // Upvote post by id
  const upvotePost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  // Add comment to a post by postId
  const addComment = (postId, text) => {
    const newComment = {
      id: uuidv4(),
      text,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <PostsContext.Provider
      value={{ posts, addPost, editPost, deletePost, upvotePost, addComment }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}
