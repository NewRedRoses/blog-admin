import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.jsx";
import Manage from "./pages/Manage.jsx";
import Post from "./pages/Post.jsx";
import NewPost from "./pages/NewPost.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const backendUrl = "https://blog-backend-production-347b.up.railway.app/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login backendUrl={backendUrl} />,
  },
  {
    path: "/manage",
    element: <Manage backendUrl={backendUrl} />,
  },
  {
    path: "/manage/:postId",
    element: <Post backendUrl={backendUrl} />,
  },
  {
    path: "/new",
    element: <NewPost backendUrl={backendUrl} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
