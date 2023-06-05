import { Flex, Avatar, Box, VStack } from "@chakra-ui/react";
import UserCard from "../UserCard/UserCard";

const ListUser = ({ data }) => {
  console.log("ListUser", data);
  return (
    <VStack gap="10px">
      {data?.map((elem) => (
        <UserCard key={elem._id} {...elem} />
      ))}
    </VStack>
  );
};

export default ListUser;
