import { useState } from "react";
import PostForm from "../components/PostForm";
import NavButton from "../components/NavButton.jsx";
export default function NewPost() {
  const [post, setPost] = useState("");
  const url = "http://localhost:3000/admin/posts/";
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
