import { useState } from "react";
import PostForm from "../components/PostForm";
import NavButton from "../components/NavButton.jsx";
export default function NewPost({ backendUrl }) {
  const [post, setPost] = useState("");
  const url = `${backendUrl}admin/posts/`;
  return (
    <>
      <div className="post-content">
        <NavButton text={"Back"} />
        <PostForm
          title="Create a new post"
          post={post}
          requestType="POST"
          url={url}
          setPost={setPost}
        />
      </div>
    </>
  );
}
