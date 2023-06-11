import {
  Button,
  Box,
  Flex,
  useToast,
  Input,
  Image,
  FormLabel,
  Progress,
  Text,
} from "@chakra-ui/react";

import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useSelector, useDispatch } from "react-redux";
import {
  getSingleBlogSuccess,
  updateBlogSuccess,
  alertBlog,
} from "../../redux/blog/blog.actions";

const EditBlog = () => {
  const { blogId } = useParams();
  const blog = useSelector((store) => store.blogReducer.singleBlog);
  const blogAlert = useSelector((store) => store.blogReducer.blogAlert);
  const blogError = useSelector((store) => store.blogReducer.blogError);
  const blogLoading = useSelector((store) => store.blogReducer.blogLoading);
  const dispatch = useDispatch();
  const [text, setText] = useState(null);
  // const [title, setTitle] = useState("untitled");
  const titleRef = useRef("untitled");
  const coverImageInputRef = useRef(null);
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  // console.log("blog from edit page", blog);

  const toast = useToast();

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    let payload = { content: text, title: titleRef.current.value, coverImage };
    dispatch(updateBlogSuccess(payload, blogId));
  };

  // console.log("title", titleRef.current.value);
  // console.log("cover Image", coverImage);

  //it will set the value of text means value of quill, the value that we are getting from backend if present;
  useEffect(() => {
    if (blog.content) {
      setText(blog?.content);
      // setTitle(blog?.title);
      titleRef.current.value = blog?.title;
      setCoverImage(blog?.coverImage);
    }
  }, [blog?.content, blog?.titile, blog?.coverImage]);

  useEffect(() => {
    dispatch(getSingleBlogSuccess(blogId));
  }, [blogId]);

  useEffect(() => {
    if (blogAlert) {
      toast({
        title: blogAlert,
        status: blogError ? "error" : "success",
        isClousable: true,
        position: "top-right",
        duration: 1500,
      });
      dispatch(alertBlog(null));
    }
  }, [blogAlert]);

  useEffect(() => {
    const editor = quillRef.current.getEditor();
    editor.getModule("toolbar").addHandler("image", imageIconClickHanlder);
  }, []);

  //images upload to cloudinary
  let imageUploadHandler = async (value) => {
    let formData = new FormData();
    formData.append("file", value);
    formData.append("upload_preset", "bloggy");
    formData.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
    // console.log("formData", formData);
    try {
      setImageUploadLoading(true);
      let response = await axios.post(
        // `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        `https://api.cloudinary.com/v1_1/dmj1ekjt9/image/upload`,
        formData
      );
      // console.log("image url", response);
      setImageUploadLoading(false);
      return response?.data?.secure_url;
    } catch (err) {
      console.log(err);
      setImageUploadLoading(false);
      toast({
        title: "image upload failed",
        description: err,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
      // return "";
    }
  };

  const imageIconClickHanlder = () => {
    // console.log("image icon clicked");
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    // console.log("file change called ", file);
    if (file) {
      imageUploadHandler(file).then((imageUrl) => {
        if (imageUrl) {
          // console.log("image url", imageUrl);
          const range = quillRef.current.getEditor().getSelection(); // return -> {index,length}
          quillRef.current
            .getEditor()
            .insertEmbed(range?.index, "image", imageUrl);
        }
      });
    }
  };

  //cover image upload to cloudinary and set the coverImage value;
  const handleCoverImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      imageUploadHandler(file)
        .then((imageUrl) => {
          if (imageUrl) {
            setCoverImage(imageUrl);
          }
        })
        .catch((err) => console.log("error while uploading cover image", err));
    }
  };

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

  const toolbarOption = [
    ["bold", "italic", "underline"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ];

  // console.log("image upload loading", imageUploadLoading);

  return (
    <Box marginTop='100px'>
      <Flex justifyContent="center" marginBottom={"10px"}>
        <Input
          width="50%"
          ref={titleRef}
          type="text"
          placeholder="Your Blog's Title"
          onChange={(e) => (titleRef.current.value = e.target.value)}
        />
        <Button onClick={() => coverImageInputRef.current.click()}>
          Upload cover Image
        </Button>
      </Flex>
      <Input
        ref={coverImageInputRef}
        display="none"
        type="file"
        onChange={handleCoverImage}
      />
      {coverImage && <Image margin="auto" src={coverImage} alt="coverImage" />}
      <Flex justifyContent={"flex-end"}>
        <Button
          isLoading={blogLoading}
          loadingText="saving..."
          bg="button.bg"
          color="white"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Flex>
      {/* if uploading images then this Progress bar will be visible */}
      {imageUploadLoading && (
        <div
          style={{
            position: "absolute",
            zIndex: "10",
            top: "60%",
            left: "25%",
            height: "100px",
            width: "50%",
            textAlign: "center",
          }}
        >
          <Text>uploading</Text>
          <Progress
            size="md"
            borderRadius="30px"
            hasStripe
            colorScheme={"green"}
            isIndeterminate
          />
        </div>
      )}

      <ReactQuill
        ref={quillRef}
        value={text}
        onChange={handleChange}
        formats={formats}
        modules={{
          toolbar: toolbarOption,
        }}
        theme="snow"
        style={{ height: "90vh", width: "90%", margin: "auto" }}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default EditBlog;
