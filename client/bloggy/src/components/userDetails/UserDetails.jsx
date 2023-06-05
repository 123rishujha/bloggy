import { useState, useEffect } from "react";

import {
  Box,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Grid,
  GridItem,
  Text,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { getProfileSuccess } from "../../redux/user/user.actions";

const UserDetails = ({ _id, name, email, pic = null }) => {
  const user = useSelector((store) => store.userReducer.user);
  const loading = useSelector((store) => store.userReducer.loading);
  const dispatch = useDispatch();

  // console.log("user Details", user);

  useEffect(() => {
    dispatch(getProfileSuccess());
  }, []);

  return (
    <Box
      h="fit-content"
      color="white"
      bg="coral"
      p="5px"
      boxSize="border-box"
      maxW="700px"
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
              <Text>0</Text>
              <Text>Posts</Text>
            </Box>
          </Flex>
          {user._id === _id ? (
            <Flex width="100%" justifyContent="space-around" marginTop="14px">
              <Button bg="button.bg" w="40%" color="white">
                Edit
              </Button>
              <Button bg="button.bg" w="40%" color="white">
                Share
              </Button>
            </Flex>
          ) : (
            <Flex width="100%" justifyContent="space-around" marginTop="14px">
              <Button bg="button.bg" w="40%" color="white">
                Follow
              </Button>
              <Button bg="button.bg" w="40%" color="white">
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
