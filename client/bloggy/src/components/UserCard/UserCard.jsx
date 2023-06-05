import { Flex, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UserCard = ({ _id, name, pic }) => {
  return (
    <>
      <Link to={`/profile/${_id}`}>
        <Flex
          w="180px"
          heigh="30px"
          bg="button.bg"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="20px"
          mr="0px"
        >
          <Avatar name={name} src={pic} />
          <Text marginRight="10px" noOfLines={1}>
            {name.toUpperCase()}
          </Text>{" "}
        </Flex>
      </Link>
    </>
  );
};

export default UserCard;
