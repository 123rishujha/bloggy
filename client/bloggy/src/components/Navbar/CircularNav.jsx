import { useState } from "react";
import Styles from "./CircularNav.module.css";
import { Box, IconButton, Button, Icon } from "@chakra-ui/react";
import { CloseIcon, ChatIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ImHome } from "react-icons/im";
import { SiBloglovin } from "react-icons/si";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const CircularNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={Styles.menu}>
      <IconButton
        onClick={() => setOpen(!open)}
        className={`${Styles.toggle} ${Styles.btn}`}
        aria-label="chat"
        // icon={<CloseIcon />}
        icon={open ? <CloseIcon /> : <HamburgerIcon />}
        bg="button.bg"
        boxShadow="2xl"
        _hover={{ bg: "button.bg" }}
      ></IconButton>
      <Box
        className={Styles.iconWrapper}
        w={open ? "200px" : "0px"}
        h={open ? "200px" : "0px"}
        transform={open ? "rotate(0deg)" : "rotate(180deg)"}
      >
        <Icon
          boxShadow="2xl"
          className={`${Styles.item} ${Styles.item1} `}
          as={ImHome}
          boxSize={10}
          padding="10px"
          cursor="pointer"
        />
        <Icon
          boxShadow="2xl"
          className={`${Styles.item} ${Styles.item2} `}
          as={SiBloglovin}
          boxSize={10}
          padding="10px"
          cursor="pointer"
        />
        <Icon
          boxShadow="2xl"
          className={`${Styles.item} ${Styles.item3} `}
          as={BsFillChatDotsFill}
          boxSize={10}
          padding="10px"
          cursor="pointer"
          onClick={()=>navigate("/chat")}
        />
        <Icon
          boxShadow="2xl"
          className={`${Styles.item} ${Styles.item4} `}
          as={AiFillPlusCircle}
          boxSize={10}
          padding="10px"
          cursor="pointer"
        />
      </Box>
    </div>
  );
};

export default CircularNav;
