import { Flex, Avatar, Text, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

//listing user during search single card--***-------------

const UserCard = ({ _id, name, pic,onClose }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${_id}`);
    onClose();
  };

  return (
    <>
      {/* <Link to={`/profile/${_id}`}> */}
      <Flex
        w="180px"
        heigh="30px"
        bg="button.bg"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="20px"
        mr="0px"
        onClick={handleNavigate}
      >
        <Avatar name={name} src={pic} />
        <Text marginRight="10px" noOfLines={1}>
          {name.toUpperCase()}
        </Text>{" "}
      </Flex>
      {/* </Link> */}
    </>
  );
};

export default UserCard;
