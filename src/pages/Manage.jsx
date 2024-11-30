import { useEffect, useState } from "react";
import { authenticatedRequest } from "../api"; // Import the authenticated request utility
import { useNavigate } from "react-router-dom"; // Add navigation for redirecting if needed
import "../styles/manage.css";

export default function Manage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use authenticatedRequest instead of fetch
        const data = await authenticatedRequest(
          "http://localhost:3000/admin/posts"
        );
        setPosts(data);
      } catch (err) {
        // Handle potential errors (like unauthorized access)
        setError(err.message);

        // Optional: redirect to login if unauthorized
        if (err.message === "Unauthorized") {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (postId) => {
    try {
      // Use authenticatedRequest for delete with proper method
      await authenticatedRequest(
        `http://localhost:3000/posts/${postId}`,
        "DELETE"
      );

      // Remove the deleted post from the local state
      console.log("delete request");
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete post");
    }
  };

  const handlePublish = async (postId) => {
    try {
      // Use authenticatedRequest for publish (assuming PUT method)
      const updatedPost = await authenticatedRequest(
        `http://localhost:3000/posts/${postId}`,
        "PUT",
        { published: true }
      );

      // Update the local state with the published post
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (err) {
      console.error("Publish failed:", err);
      setError("Failed to publish post");
    }
  };

  // Error handling UI
  if (error) {
    return (
      <div className="error-container">
        <p>An error occurred: {error}</p>
        <button onClick={() => setError(null)}>Retry</button>
      </div>
    );
  }

  function PostList() {
    return (
      <ul className="posts-container">
        {posts.map((post) => (
          <li key={post.id} className="post-container">
            <span className="post-url">{post.title}</span>
            <button
              className="post-delete-btn"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
            <button
              className="post-publish-btn"
              onClick={() => handlePublish(post.id)}
            >
              {post.published ? "Unpublish" : "Publish"}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="content">
      <div className="manage-post-container">
        <h1>Posts</h1>
        {posts.length > 0 ? <PostList /> : "Nothing to see here..."}
      </div>
    </div>
  );
}
