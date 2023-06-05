import { Search2Icon } from "@chakra-ui/icons";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Box,
} from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";

import { userSearchSuccess } from "../../redux/user/user.actions";
import { useSelector, useDispatch } from "react-redux";
import ListUser from "../ListUser/ListUser";

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const users = useSelector((store) => store.userReducer.users);
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    dispatch(userSearchSuccess(query));
  };

  // console.log("user sideDrawer", users);

  return (
    <>
      <IconButton
        width="100px"
        variant="outline"
        bgColor="rgb(89, 159, 187)"
        aria-label="Search here"
        onClick={onOpen}
        icon={<Search2Icon />}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Find Some One</DrawerHeader>
          <DrawerBody>
            <SearchBar handleSearch={handleSearch} />
            <Box marginTop="20px">
              <ListUser data={users} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
