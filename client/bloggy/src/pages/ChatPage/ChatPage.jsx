import { useState, useEffect } from "react";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { getChatsSuccess } from "../../redux/chat/chat.actions";

import ChatBox from "../../components/ChatBox.jsx/ChatBox";

const ChatPage = () => {
  const [chatSelected, setChatSelected] = useState({});
  const chats = useSelector((store) => store.chatReducer.chats);
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatsSuccess());
  }, []);

  //get know who is the sender of this message;
  const getSender = (userData) => {
    return userData[0].name !== user.name ? userData[0].name : userData[1].name;
  };

  const handleClick = (elem) => {
    let details = { ...elem, chatName: getSender(elem.users)?.toUpperCase() };
    setChatSelected(details);
  };

  // console.log(chatSelected);

  return (
    <Box
      w="100%"
      height="100vh"
      margin="auto"
      marginTop="50px"
      display="flex"
      justifyContent="center"
      gap="10px"
      background="bgColor.bg"
    >
      <Flex
        flexDir="column"
        background="bgColor.darkBlue"
        gap="5px"
        marginTop="10px"
        h="80vh"
        width={{base:"90%",md:"30%"}}
        borderRadius="20px"
        color="gray.700"
        padding="20px"
        boxSizing="border-box"
        display={{base: chatSelected.chatName ? "none" : "flex",md:"flex"}}
      >
        <Heading>Recent Chats</Heading>
        {chats?.map((elem) => (
          <Flex
            key={elem._id}
            maxW="200px"
            bg={chatSelected._id === elem._id ? "skyblue" : "gray.300"}
            padding="10px"
            justifyContent="space-between"
            align-items="center"
            borderRadius="20px"
            onClick={() => handleClick(elem)}
          >
            <Avatar
              name={getSender(elem.users)?.toUpperCase()}
              src={elem?.pic}
            />
            <Text>{getSender(elem.users)?.toUpperCase()}</Text>
          </Flex>
        ))}
      </Flex>
      <ChatBox {...chatSelected} setChatSelected={setChatSelected} />
    </Box>
  );
};

export default ChatPage;
