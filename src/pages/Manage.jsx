import { useEffect, useState } from "react";
import { authenticatedRequest } from "../api"; // Import the authenticated request utility
import { Link, useNavigate } from "react-router-dom"; // Add navigation for redirecting if needed
import "../styles/manage.css";

import { SquarePen } from "lucide-react";

export default function Manage({ backendUrl }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = `${backendUrl}admin/posts`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use authenticatedRequest instead of fetch
        const data = await authenticatedRequest(url);
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
  }, [navigate, url]);

  const handleUnpublish = async (postId) => {
    try {
      // Use authenticatedRequest for unpublish with proper method

      await authenticatedRequest(
        `${backendUrl}posts/${postId}?publish=false`,
        "PATCH"
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, date_published: null } : post
        )
      );
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete post");
    }
  };

  const handlePublish = async (postId) => {
    try {
      // Use authenticatedRequest for publish (assuming PUT method)
      const updatedPost = await authenticatedRequest(
        `${backendUrl}posts/${postId}?publish=true`,
        "PATCH",
        { date_published: new Date() }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, date_published: new Date() } : post
        )
      );
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
            <Link to={`/manage/${post.id}`}>{post.title}</Link>

            {post.date_published == null ? (
              <button className="btn" onClick={() => handlePublish(post.id)}>
                publish
              </button>
            ) : (
              <button className="btn" onClick={() => handleUnpublish(post.id)}>
                unpublish
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="content">
      <div className="card">
        <h1 className="posts-header">
          <span>Posts</span>
          <Link to="/new">
            <SquarePen className="create-post-icon" />
          </Link>
        </h1>
        {posts.length > 0 ? <PostList /> : "Nothing to see here..."}
      </div>
    </div>
  );
}
