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
} from "@chakra-ui/react";
import { MoonIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import SideDrawer from "../SideDrawer/SideDrawer";

import { useSelector } from "react-redux";

const TopNabar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((store) => store.userReducer.user);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <Flex
      bg="button.bg"
      h="70px"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="20px"
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
        <SideDrawer />
        <Menu bg="button.bg">
          <MenuButton>
            <WrapItem display="flex" alignItems="center">
              <Avatar name={user.name} src={user.pic} cursor="pointer" />
            </WrapItem>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleNavigate}>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default TopNabar;
