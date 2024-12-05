import { authenticatedRequest } from "../api"; // Import the authenticated request utility
import "../styles/post.css";
import { Editor } from "@tinymce/tinymce-react";
export default function PostForm({ title, url, requestType, post, setPost }) {
  async function handleSubmit() {
    const send = confirm("Are you sure you want to submit these changes?");
    if (send) {
      try {
        await authenticatedRequest(url, requestType, post);
        alert("Post submitted successfully");
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }

  const handleEditorChange = (value) => {
    setPost({ ...post, content: value });
  };
  return (
    <>
      <div className="post-update-form">
        <div className="post-title-container">
          <h1>{title}</h1>
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
          <Editor
            apiKey="vjo3bb18wsev7vhdm8v93fj545hv8n0ayk4spa0n656u5qnt"
            init={{
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
            }}
            value={post.content}
            onEditorChange={handleEditorChange}
          />
        </div>

        <button
          type="button"
          className="submit-btn btn"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </>
  );
}
