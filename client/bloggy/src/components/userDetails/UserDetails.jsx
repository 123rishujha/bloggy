import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Avatar,
  Text,
  Flex,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { getProfileSuccess } from "../../redux/user/user.actions";
import { accessChatSuccess } from "../../redux/chat/chat.actions";
import { createBlogSuccess, alertBlog } from "../../redux/blog/blog.actions";

const UserDetails = ({ _id, name, email, pic = null, posts }) => {
  const user = useSelector((store) => store.userReducer.user);
  const singleBlog = useSelector((store) => store.blogReducer.singleBlog);
  const alert = useSelector((store) => store.chatReducer.alert);
  const blogAlert = useSelector((store) => store.blogReducer.blogAlert);
  const blogError = useSelector((store) => store.blogReducer.blogError);
  const error = useSelector((store) => store.chatReducer.error);
  const loading = useSelector((store) => store.userReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("singleBlog", singleBlog);

  // console.log("posts from userDetails com", posts);

  const toast = useToast();

  const handleBlogCreate = () => {
    dispatch(createBlogSuccess());
  };

  const handleChatsCreate = () => {
    let userId = _id || user._id;
    dispatch(accessChatSuccess(userId));
  };

  useEffect(() => {
    if (blogAlert) {
      toast({
        title: blogAlert,
        status: blogError ? "error" : "success",
        position: "top-right",
        isClosable: true,
      });
      if (!blogError) {
        navigate(`/edit/${singleBlog?._id}`);
      }
      dispatch(alertBlog(null));
    }
  }, [blogAlert]);

  useEffect(() => {
    if (user._id !== _id) {
      // console.log("userId", user._id, "id", _id);
      if (alert) {
        toast({
          title: alert,
          status: error ? "error" : "success",
          position: "top-right",
          isClosable: true,
        });
        if (!error) {
          navigate("/chat");
        }
      }
    }
  }, [alert]);

  useEffect(() => {
    if (!_id || !name || !email) {
      // console.log("called user profile in UserDetails comp", user);
      dispatch(getProfileSuccess());
    }
  }, []);

  return (
    <Box
      h="fit-content"
      color="white"
      bg="coral"
      p="5px"
      boxSize="border-box"
      maxW="700px"
      // border="1px solid red"
      borderRadius="20px"
      m="auto"
    >
      <Flex justifyContent="space-around" alignItems="center">
        <Box>
          <Avatar
            name={name}
            src={pic ? pic : null}
            size={{ base: "md", sm: "2xl" }}
          />
          <Heading as="h4" size="md">
            {name?.toUpperCase()}
          </Heading>
        </Box>
        <Box width={{ base: "70%", md: "60%" }}>
          <Flex justifyContent="space-around" width="100%" fontSize="14px">
            <Box>
              <Text>0</Text>
              <Text>Followers</Text>
            </Box>
            <Box>
              <Text>0</Text>
              <Text>Following</Text>
            </Box>
            <Box>
              <Text>{posts?.length || 0}</Text>
              <Text>Posts</Text>
            </Box>
          </Flex>
          {user._id === _id ? (
            <Flex width="100%" justifyContent="space-around" marginTop="14px">
              <Button bg="button.bg" w="40%" color="white">
                Edit
              </Button>
              <Button
                bg="button.bg"
                w="40%"
                color="white"
                onClick={handleBlogCreate}
              >
                create Blog
              </Button>
            </Flex>
          ) : (
            <Flex width="100%" justifyContent="space-around" marginTop="14px">
              <Button bg="button.bg" w="40%" color="white">
                Follow
              </Button>
              <Button
                bg="button.bg"
                w="40%"
                color="white"
                onClick={() => handleChatsCreate()}
              >
                Message
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserDetails;
