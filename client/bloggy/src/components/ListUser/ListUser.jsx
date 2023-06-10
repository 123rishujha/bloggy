import { Flex, Avatar, Box, VStack } from "@chakra-ui/react";
import UserCard from "../UserCard/UserCard";

const ListUser = ({ data,onClose }) => {
  // console.log("ListUser", data);
  return (
    <VStack gap="10px">
      {data?.map((elem) => (
        <UserCard key={elem._id} onClose={onClose} {...elem} />
      ))}
    </VStack>
  );
};

export default ListUser;
