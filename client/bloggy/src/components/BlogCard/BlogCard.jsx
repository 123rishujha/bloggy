import { Box, Flex, Image, Text, Avatar } from "@chakra-ui/react";
import Styles from "./BlogCard.module.css";

import { Link } from "react-router-dom";

import defaultBackgroundImage from "./background.svg";

const BlogCard = ({ coverImage, title, author, _id }) => {
  // console.log(coverImage, title, author);
  return (
    <Box className={Styles.blogCard}>
      <Link to={`/profile/${author?._id}`}>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          borderRadius="10px"
          gap="5px"
        >
          <Avatar name={author?.name} src={author?.image} />
          <Text color="black">{author?.name.toUpperCase()}</Text>
        </Flex>
      </Link>
      <Link to={`/blog/${_id}`}>
        <Image
          src={coverImage || defaultBackgroundImage}
          className={Styles.image}
          objectFit="cover"
          alt="coverImage"
        />
        <Text
          textAlign="left"
          boxSizing="border-box"
          noOfLines={2}
          height="25px"
          overflow="hidden"
          color="black"
          // border="1px solid red"
        >
          {title}
        </Text>
      </Link>
    </Box>
  );
};

export default BlogCard;
