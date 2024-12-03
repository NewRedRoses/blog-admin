import "../styles/comment.css";
import { Trash2 } from "lucide-react";
export default function Comment({ author, text, date }) {
  function handleDelete() {
    const decision = confirm("Are you sure you want to delete this comment?");
    if (decision) {
      //
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
