import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { authenticatedRequest } from "../api"; // Import the authenticated request utility
import NavButton from "../components/NavButton";

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

  return (
    <>
      <div className="post-content">
        <NavButton text={"Back"} />
        <PostForm
          title="Edit post"
          url={url}
          requestType="PUT"
          post={post}
          setPost={setPost}
        />
      </div>
    </>
  );
}
