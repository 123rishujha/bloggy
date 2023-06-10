import { Routes, Route } from "react-router-dom";
import ChatPage from "../pages/ChatPage/ChatPage";
import EditBlog from "../pages/EdtiBlog/EditBlog";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SingleBlogPage from "../pages/SingleBlogPage/SingleBlogPage";
import AllBlogs from "../pages/AllBlogs/AllBlogs";

//private router for restricted routes;
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile/:userId?"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:blogId"
          element={
            <PrivateRoute>
              <SingleBlogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:blogId"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <AllBlogs />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
