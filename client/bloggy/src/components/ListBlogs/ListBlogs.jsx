import { Flex, Box, Grid, GridItem } from "@chakra-ui/react";
import BlogCard from "../BlogCard/BlogCard";
import Styles from "./ListBlogs.module.css";

const ListBlogs = ({ blogs }) => {
  // console.log("ListBlogs", blogs);
  return (
    <Grid
      templateColumns={{
        base: "repeat(1,minmax(250px, 400px))",
        md: "repeat(2,minmax(250px, 1fr))",
        lg: "repeat(3,1fr)",
      }}
      className={Styles.mainBlogsContainer}
    >
      {blogs?.map((elem) => (
        <GridItem height="300px" key={elem._id}>
          <BlogCard  {...elem} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ListBlogs;
