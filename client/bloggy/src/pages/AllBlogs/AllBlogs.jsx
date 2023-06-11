import { Heading, Box } from "@chakra-ui/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getBlogsSuccess } from "../../redux/blog/blog.actions";
import ListBlogs from "../../components/ListBlogs/ListBlogs";

const AllBlogs = () => {
  const blogs = useSelector((store) => store.blogReducer.blogs);
  const dispatch = useDispatch();
  // console.log("All blogs page", blogs);

  useEffect(() => {
    // if (blogs.length == 0) {
      dispatch(getBlogsSuccess());
    // }
  }, []);

  return (
    <Box w="90%" margin="auto" marginTop='90px'>
      <Heading margin="10px">Latest Blogs</Heading>
      <ListBlogs blogs={blogs} />
    </Box>
  );
};

export default AllBlogs;
