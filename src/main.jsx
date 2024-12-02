import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.jsx";
import Manage from "./pages/Manage.jsx";
import Post from "./pages/Post.jsx";
import NewPost from "./pages/NewPost.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/manage",
    element: <Manage />,
  },
  {
    path: "/manage/:postId",
    element: <Post />,
  },
  {
    path: "/new",
    element: <NewPost />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
