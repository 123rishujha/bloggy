import {
  Flex,
  useColorMode,
  Image,
  Avatar,
  SunIcon,
  Button,
  Box,
  IconButton,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import { ImHome } from "react-icons/im";
import { BsFillChatDotsFill } from "react-icons/bs";

import SideDrawer from "../SideDrawer/SideDrawer";

import Styles from "./TopNavbar.module.css";

import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/user/user.actions";

const TopNabar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <Flex
      bg="button.bg"
      h="70px"
      w="100%"
      justifyContent = "space-between"
      alignItems = "center"
      marginBottom = "20px"
      position = 'fixed'
      top = "0px"
      zIndex="20"
    >
      <Flex>
        <Image alt="logo" />
        <IconButton
          variant="ghost"
          onClick={toggleColorMode}
          colorScheme="black"
          ml="5px"
          icon={<MoonIcon />}
        />
      </Flex>
      <Flex gap="10px" justifyContent="center" alignItems="center">
        <Box className={Styles.iconWrapper}>
          <Icon
            boxShadow="2xl"
            className={`${Styles.item} ${Styles.item1} `}
            as={ImHome}
            boxSize={10}
            padding="10px"
            cursor="pointer"
            onClick={() => navigate("/blogs")}
            _hover={{ background: "white", color: "black" }}
          />
          <Icon
            boxShadow="2xl"
            className={`${Styles.item} ${Styles.item3} `}
            as={BsFillChatDotsFill}
            boxSize={10}
            padding="10px"
            cursor="pointer"
            onClick={() => navigate("/chat")}
            _hover={{ background: "white", color: "black" }}
          />
        </Box>
        <SideDrawer />
        <Menu bg="button.bg">
          <MenuButton>
            <WrapItem display="flex" alignItems="center">
              <Avatar name={user.name} src={user.pic} cursor="pointer" />
            </WrapItem>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleNavigate}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default TopNabar;
