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
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import {
  getMessagesSuccess,
  sendMessageSuccess,
  sendMessage,
} from "../../redux/message/message.actions";

import MessageBox from "./MessageBox";

import { io } from "socket.io-client";

export let socket;
// let selectedChatCompare;

const ChatBox = ({ _id, chatName, pic, setChatSelected }) => {
  const [text, setText] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const messages = useSelector((store) => store.messageReducer.messages);
  const user = useSelector((store) => store.userReducer?.user);
  const chatBoxRef = useRef();
  // const boxWidthRef = useRef();

  const dispatch = useDispatch();

  // console.log("socketConnected", socketConnected);

  // console.log("id", _id, "chatName", chatName);
  // console.log("messages", messages);

  const handleText = (e) => {
    setText(e.target.value);
  };

  const send = (e) => {
    if (e.key === "Enter" && text !== "") {
      // console.log("submit message");
      let payload = { message: text };
      setText("");
      dispatch(sendMessageSuccess(_id, payload, socket));
    }
  };

  //making connection and setting up loggedIn user connection
  useEffect(() => {
    socket = io(`${process.env.REACT_APP_BASE_URL}`);
    // console.log("before setup", user); // this is loggedIn user
    socket.emit("setup", user._id);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    if (_id) {
      dispatch(getMessagesSuccess(_id, socket));
    }
  }, [chatName, _id, dispatch]);

  //scroll function below--------------------------
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight;
    }
  };

  // Add this useEffect hook to scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("arrived", (newMessageData) => {
      //  console.log("arrived called",newMessageData);
      dispatch(sendMessage(newMessageData));
      //sendMessage will not send data to server it will just update the reducers state with this newMessageData check message.actions file for better understanding;
    });
  }, []);

  return (
    <>
      {_id ? (
        <Box
          display={{ base: chatName ? "block" : "none", md: "block" }}
          h="85vh"
          background="bgColor.darkBlue"
          width={{ base: "90%", md: "60%" }}
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
              justifyContent={{ base: "space-between", md: "flex-end" }}
              alignItems="center"
            >
              {chatName && (
                <IconButton
                  display={{ base: "block", md: "none" }}
                  onClick={() => setChatSelected({})}
                  aria-label="go back"
                  icon={<ChevronLeftIcon />}
                />
              )}
              <Flex alignItems="center">
                <Heading as="h4" size="md">
                  {chatName}
                </Heading>
                <Avatar bg="skyblue" name={chatName} src={pic} />
              </Flex>
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
                {messages?.map((elem) => {
                  return <MessageBox elem={elem} user={user} />;
                })}
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
      ) : (
        <Flex
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h="85vh"
          background="bgColor.darkBlue"
          width={{ base: "90%", md: "60%" }}
          borderRadius="20px"
          color="white"
          padding="20px"
          marginTop="10px"
          boxSizing="border-box"
        >
          <Text>Please select user to chat</Text>
        </Flex>
      )}
    </>
  );
};

export default ChatBox;
