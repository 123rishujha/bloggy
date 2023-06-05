import "./CustomScrollbar.css";
import {
  Heading,
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  FormControl,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getMessagesSuccess,
  sendMessageSuccess,
} from "../../redux/message/message.actions";

const ChatBox = ({ _id, chatName, pic }) => {
  const [text, setText] = useState("");
  const messages = useSelector((store) => store.messageReducer.messages);
  const user = useSelector((store) => store.userReducer?.user);
  const dispatch = useDispatch();

  const chatBoxRef = useRef();

  // Scroll to bottom function
  const scrollToBottom = () => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  };

  // Add this useEffect hook to scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // console.log("id", _id, "chatName", chatName);
  console.log("messages", messages);

  const handleText = (e) => {
    setText(e.target.value);
  };

  const send = (e) => {
    if (e.key === "Enter" && text !== "") {
      // console.log("submit message");
      let payload = { message: text };
      setText("");
      dispatch(sendMessageSuccess(_id, payload));
    }
  };

  useEffect(() => {
    if (_id) {
      dispatch(getMessagesSuccess(_id));
    }
  }, [chatName, _id, dispatch]);

  return (
    <Box
      h="85vh"
      background="bgColor.darkBlue"
      width="60%"
      borderRadius="20px"
      color="gray.700"
      padding="20px"
      marginTop="10px"
      boxSizing="border-box"
    >
      <header>
        <Flex
          gap="10px"
          height="50px"
          padding="10px"
          boxSizing="border-box"
          backgroundColor="rgb(89, 159, 187)"
          color="white"
          borderRadius="15px"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Heading as="h4" size="md">
            {chatName}
          </Heading>
          <Avatar bg="skyblue" name={chatName} src={pic} />
        </Flex>
      </header>

      <section style={{ height: "90%" }}>
        <Flex
          flexDir="column"
          justifyContent="space-between"
          alignItems="space-between"
          height="100%"
        >
          <Box
            className="custom-scrollbar"
            height="90%"
            boxSizing="border-box"
            overflowY="scroll"
            marginTop="10px"
            ref={chatBoxRef}
          >
            {messages?.map((elem) => (
              <Box
                marginLeft={
                  user?._id === elem?.sender?._id ? `calc(95% - 200px)` : "30px"
                }
                key={elem._id}
                padding="10px"
                width="200px"
                bg="gray.400"
                mb="10px"
                borderRadius="15px"
              >
                <Text textAlign="left" fontWeight="600" fontSize="18px">
                  {elem.message}
                </Text>
              </Box>
            ))}
          </Box>
          <FormControl onKeyDown={send}>
            <Input
              type="text"
              value={text}
              width="80%"
              margin="auto"
              onChange={handleText}
              placeholder="message..."
            />
          </FormControl>
        </Flex>
      </section>
    </Box>
  );
};

export default ChatBox;
