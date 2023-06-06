import { useEffect, useState } from "react";
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

import { Navigate } from "react-router-dom";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

//redux function to update reducer state;
import { useSelector, useDispatch } from "react-redux";
import { getProfileSuccess, LoginSuccess } from "../../redux/user/user.actions";


const Login = () => {
  //   const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const loading = useSelector((store) => store.userReducer.loading);
  const error = useSelector((store) => store.userReducer.error);
  const isAuth = useSelector((store) => store.userReducer.isAuth);
  const dispatch = useDispatch();

  console.log("isAuth", isAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email", email, "password", password);
    // console.log("submitted");
    dispatch(LoginSuccess({ email, password }));
  };

  //after login setting the users Details in redux
  // useEffect(() => {
  //   dispatch(getProfileSuccess());
  // }, [isAuth]);


  useEffect(() => {
    if (!loading) {
      if (isAuth) {
        toast({
          title: "Login successfull",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
      } else {
        if (error) {
          toast({
            title: "something went wrong",
            status: "error",
            position: "top-right",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    }
  }, [isAuth, error, loading]);


  if(isAuth){
    return <Navigate to='/profile' />;
  }


  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl
          display="flex"
          flexDir="column"
          justifyContent="space-center"
          gap="15px"
          marginTop="10px"
          minHeight="300px"
        >
          {/* <FormLabel>Your Name</FormLabel>
            <Input type='text'  value={name} onChange={(e)=> setName(e.target.value)}  /> */}
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
              <Button variant="ghost" onClick={() => setShow(!show)}>
                {!show && <ViewOffIcon />}
                {show && <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            type="submit"
            bg="button.bg"
            color="white"
            isLoading={loading}
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
          >
            submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default Login;
