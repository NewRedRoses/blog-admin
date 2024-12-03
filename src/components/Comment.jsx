import "../styles/comment.css";
export default function Comment({ author, text, date }) {
  return (
    <div className="comment-container">
      <div className="comment-author-container">{author}</div>
      <div className="comment-text-container">{text}</div>
      <div className="comment-date-container">{date}</div>
    </div>
  );
}
