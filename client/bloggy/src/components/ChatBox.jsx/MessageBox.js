import {
  Heading,
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  FormControl,
  VStack,
  IconButton
} from "@chakra-ui/react";

import { useRef } from "react";

const MessageBox = ({elem,user}) =>{
    const chatBoxRef = useRef();
    return(
        <Box
                key={elem._id}
                ref={chatBoxRef}
                boxSizing='border-box'
                padding="10px"
                bg="gray.400"
                mb="10px"
                borderRadius="15px"
                maxW={{base:"150px",md:"300px"}}
                width='fit-content'
                // width='auto'
                // marginLeft={
                //   user?._id === elem?.sender?._id ? `calc(95% - ${chatBoxRef?.current?.offsetWidth}px)` : "30px"
                // }
                marginLeft={user?._id === elem?.sender?._id ? "auto" : "0px"} 
                backgroundColor={ user?._id === elem?.sender?._id ? "#1eba2d" : "skyblue" }
              >
                <Text textAlign={user?._id === elem?.sender?._id ? `right` : "left"} fontWeight="600" fontSize="18px">
                  {elem.message}
                </Text>
        </Box>
    )
}

export default MessageBox