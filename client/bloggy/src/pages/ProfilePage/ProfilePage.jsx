import UserDetails from "../../components/userDetails/UserDetails";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileSuccess } from "../../redux/user/user.actions";
import { getBlogsSuccess } from "../../redux/blog/blog.actions";
import { Box, Image } from "@chakra-ui/react";

import background from "./background.svg";

import ListBlogs from "../../components/ListBlogs/ListBlogs";

import { getUserProfile } from "../../redux/user/api";

const ProfilePage = () => {
  const user = useSelector((store) => store.userReducer.user);
  const [details, setDetails] = useState(null);
  const loading = useSelector((store) => store.userReducer.loading);
  const blogs = useSelector((store) => store.blogReducer.blogs);
  const { userId } = useParams();
  // console.log("userId from profilepage", userId);
  // const [userBlogs, setUserBlogs] = useState(
  //   blogs.filter((elem) => elem.author._id === (userId ? userId : user._id)) ||
  //     []
  // );

  const userBlogs =
    blogs.filter((elem) => elem.author._id === (userId ? userId : user._id)) ||
    [];

  const dispatch = useDispatch();

  // console.log("Profile page", details);
  // console.log("blogs from profile page", blogs);
  // console.log("blog from profile page", userBlogs);

  const getData = async () => {
    try {
      let x = await getUserProfile(userId);
      // console.log("data from profile page", x);
      if (x?.data?.success) {
        setDetails(x?.data?.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      //here if we are viewing the profile of anouther user then we will not use redux because that can overide the value of user file in userReducer and we don't want that because the is the value of loggedIn User so we will make api call here directly with distrubing the redux
      getData();
    } else {
      setDetails(null);
      dispatch(getProfileSuccess());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    // getting all the blogs
    if (blogs.length == 0) {
      dispatch(getBlogsSuccess());
    }
  }, [userId]);

  return (
    <Box marginTop="100px">
      {/*  ...details means user viewing the profile of another user (...user) means user viewing their own profile  */}
      {details ? (
        <UserDetails posts={userBlogs} {...details} />
      ) : (
        <UserDetails {...user} posts={userBlogs} />
      )}
      <Box width="80%" maxW="1200px" margin="auto" marginTop="20px">
        {userBlogs.length === 0 ? (
          <Image
            src={background}
            minW="200px"
            width={{ base: "80%", md: "65%" }}
            height="60%"
            borderRadius="20px"
            alt="no posts yet"
            margin="auto"
          />
        ) : (
          <ListBlogs blogs={userBlogs} />
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
