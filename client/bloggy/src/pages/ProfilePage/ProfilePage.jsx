import UserDetails from "../../components/userDetails/UserDetails";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileSuccess } from "../../redux/user/user.actions";
import { Box } from "@chakra-ui/react";

import { getUserProfile } from "../../redux/user/api";

const ProfilePage = () => {
  const user = useSelector((store) => store.userReducer.user);
  const [details, setDetails] = useState(null);
  const loading = useSelector((store) => store.userReducer.loading);
  const dispatch = useDispatch();

  const { userId } = useParams();

  console.log("Profile page", details);

  const getData = async () => {
    try {
      let x = await getUserProfile(userId);
      // console.log("data from profile page", x);
      if (x?.data?.success) {
        setDetails(x?.data?.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      //here if we are viewing the profile of anouther user then we will not use redux because that can overide the value of user file in userReducer and we don't want that because the is the value of loggedIn User so we will make api call here directly with distrubing the redux
      getData();
    } else {
      setDetails(null);
      dispatch(getProfileSuccess());
    }
  }, [userId, dispatch]);
  return (
    <Box>
      {details ? <UserDetails {...details} /> : <UserDetails {...user} />}
    </Box>
  );
};

export default ProfilePage;
