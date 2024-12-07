import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { authenticatedRequest } from "../api"; // Import the authenticated request utility
import NavButton from "../components/NavButton";
import Comment from "../components/Comment";
import { MessageCircleDashed } from "lucide-react";

export default function Post({ backendUrl }) {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  const url = `${backendUrl}admin/posts/${postId}`;
  const commentsUrl = `${backendUrl}admin/comments/${postId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authenticatedRequest(url);
        const commentData = await authenticatedRequest(commentsUrl);

        setPost(data);
        setComments(commentData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url, commentsUrl]);

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

      <div className="comments-container">
        {comments.length == 0 ? (
          <h1 className="comments-header">
            <MessageCircleDashed /> No Comments...
          </h1>
        ) : (
          <>
            <h1 className="comments-header">Comments</h1>
            <ul className="comments-list">
              {comments.map((comment) => {
                const date = new Date(comment.date_created);
                const formatter = new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                const formattedDate = formatter.format(date);
                return (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    author={comment.username}
                    text={comment.text}
                    date={formattedDate}
                    comments={comments}
                    setComments={setComments}
                    backendUrl={backendUrl}
                  />
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
