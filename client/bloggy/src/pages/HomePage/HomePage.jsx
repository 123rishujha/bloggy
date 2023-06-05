import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  useToast,
} from "@chakra-ui/react";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";

const HomePage = () => {
  const toast = useToast();

  return (
    <Box
      display="flex"
      m="auto"
      mt="50px"
      w={{ base: "70vw", md: "40vw" }}
      h="100Vh"
    >
      <Tabs
        w="100%"
        h="fit-content"
        isFitted
        variant="unstyled"
        colorScheme="green"
        boxShadow="md"
        padding="20px"
        borderRadius="10px"
        boxSizing="border-box"
      >
        <TabList>
          <Tab
            borderRadius="5px"
            _selected={{ color: "button.textcolor", bg: "button.bg" }}
          >
            Login
          </Tab>
          <Tab
            borderRadius="5px"
            _selected={{ color: "button.textcolor", bg: "button.bg" }}
          >
            Sign UP
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HomePage;
