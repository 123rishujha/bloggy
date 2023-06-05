import { Routes, Route } from "react-router-dom";
import ChatPage from "../pages/ChatPage/ChatPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId?" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
