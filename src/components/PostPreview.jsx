export default function PostPreview({ content, title }) {
  return (
    <div className="post-preview-card">
      <h1>{title}</h1>
      <div
        className="post-content-preview-container"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
