import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

//redux function to update reducer state;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async (payload) => {
    // console.log(payload);
    setLoading(true);
    try {
      // let response = await axios.post(
      //   `https://4p0ph0-8080.csb.app/api/user/register`,
      //   payload
      // );
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/register`,
        payload,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast({
        title: "Registration successfull, login now",
        status: "success",
        isClosable: true,
        position: "top-right",
        duration: 2000,
      });
      setLoading(false);
    } catch (err) {
      // console.log(err);
      toast({
        title:
          err?.response?.data.message ||
          "something went wrong please try again",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: "please fill all the fields",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "password and confirmPassword not matched",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    if (password.length <= 5) {
      toast({
        title: "Too short",
        description: "password length should be greate than 5",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    let payload = { name, email, password };
    handleRegister(payload);
  };

  return (
    <Box>
      <article>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormControl
            display="flex"
            flexDir="column"
            justifyContent="space-center"
            gap="10px"
            minHeight="250px"
          >
            <FormLabel>Your Full Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              focusBorderColor="button.bg"
              variant="filled"
            />
            <FormLabel>Your Email</FormLabel>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              focusBorderColor="button.bg"
              variant="filled"
            />
            <FormLabel>Enter Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="123password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                focusBorderColor="button.bg"
                variant="filled"
              />
              <InputRightElement>
                {!show && (
                  <ViewOffIcon
                    onClick={() => setShow(!show)}
                    cursor="pointer"
                  />
                )}
                {show && (
                  <ViewIcon onClick={() => setShow(!show)} cursor="pointer" />
                )}
              </InputRightElement>
            </InputGroup>

            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={show1 ? "text" : "password"}
                placeholder="123password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                focusBorderColor="button.bg"
                variant="filled"
              />
              <InputRightElement>
                {!show1 && (
                  <ViewOffIcon
                    onClick={() => setShow1(!show1)}
                    cursor="pointer"
                  />
                )}
                {show1 && (
                  <ViewIcon onClick={() => setShow1(!show1)} cursor="pointer" />
                )}
              </InputRightElement>
            </InputGroup>
            <Button
              type="submit"
              bg="button.bg"
              color="white"
              isLoading={loading}
              loadingText="Submitting"
              variant="outline"
            >
              submit
            </Button>
          </FormControl>
        </form>
      </article>
    </Box>
  );
};

export default Register;
