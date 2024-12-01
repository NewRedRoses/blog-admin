import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticatedRequest } from "../api"; // Import the authenticated request utility
import "../styles/post.css";

export default function Post() {
  const [post, setPost] = useState("");

  const { postId } = useParams();
  const url = `http://localhost:3000/admin/posts/${postId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authenticatedRequest(url);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [url]);

  async function handleSubmit() {
    const send = confirm("Are you sure you want to submit these changes?");
    if (send) {
      try {
        await authenticatedRequest(url, "PUT", post);
        alert("Post submitted successfully");
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="post-content">
        <Link to="/manage">
          <button className="back-btn">Back</button>
        </Link>
        <div className="post-update-form">
          <div className="post-title-container">
            <label htmlFor="post_title">Title</label>
            <input
              type="text"
              id="post_title"
              name="post_title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>

          <div className="post-content-container">
            <label htmlFor="post_content">Post&apos;s content:</label>
            <textarea
              name="post_content"
              id="post_content"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              required
            ></textarea>
          </div>

          <button
            type="button"
            className="submit-btn btn"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
