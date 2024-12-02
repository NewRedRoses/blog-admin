import { useState } from "react";
import PostForm from "../components/PostForm";

export default function NewPost() {
  const [post, setPost] = useState("");
  return (
    <>
      <div className="post-content">
        <PostForm
          title="Create a new post"
          post={post}
          requestType="POST"
          setPost={setPost}
        />
      </div>
    </>
  );
}
