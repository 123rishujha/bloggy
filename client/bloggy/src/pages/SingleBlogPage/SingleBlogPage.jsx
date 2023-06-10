import { Box, Avatar, Heading, Image, Button, VStack } from "@chakra-ui/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getBlogsSuccess } from "../../redux/blog/blog.actions";

const SingleBlogPage = () => {
  const blogs = useSelector((store) => store.blogReducer?.blogs);
  const user = useSelector((store) => store.userReducer?.user);
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  console.log("single blog page", blogs);
  console.log("sinlge blog", blog);

  useEffect(() => {
    if (blogs.length == 0) {
      dispatch(getBlogsSuccess());
    }
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "addRange",
    "color",
    "background",
    "code-block",
  ];

  useEffect(() => {
    let data = blogs?.find((elem) => elem._id == blogId);
    console.log("blog useEffect", blogs);
    setBlog(data);
  }, [blogId, blogs]);

  return (
    <Box>
      <VStack maxH="auto" height="fit-content" width="100%">
        {blog?.author?._id == user?._id && (
          <Link to={`/edit/${blog?._id}`}>
            <Button>Edit</Button>
          </Link>
        )}

        <Avatar name={blog?.author?.name} size="2xl" />
        <Heading>{blog?.title}</Heading>
        <Image
          maxH="800px"
          src={blog?.coverImage}
          objectFit="cover"
          alt="coverImage"
        />
      </VStack>

      <ReactQuill
        value={blog?.content}
        theme="snow"
        readOnly={true}
        formats={formats}
        modules={{ toolbar: null }}
        style={{ height: "auto", width: "100%", margin: "auto" }}
      />
    </Box>
  );
};

export default SingleBlogPage;
