import "../styles/comment.css";
import { Trash2 } from "lucide-react";
import { authenticatedRequest } from "../api"; // Import the authenticated request utility

export default function Comment({
  id,
  author,
  text,
  date,
  comments,
  setComments,
  backendUrl,
}) {
  const url = `${backendUrl}admin/comments/${id}`;

  async function handleDelete() {
    const decision = confirm("Are you sure you want to delete this comment?");
    if (decision) {
      // remove comment from state
      setComments(comments.filter((a) => a.id !== id));
      // send req to remove comment from db
      await authenticatedRequest(url, "DELETE");
    }
  }
  return (
    <div className="comment-container">
      <div className="comment-top-container">
        <div className="comment-author-container">{author}</div>
        <button className="delete-comment-btn" onClick={handleDelete}>
          <Trash2 />
        </button>
      </div>
      <div className="comment-text-container">{text}</div>
      <div className="comment-date-container">{date}</div>
    </div>
  );
}
