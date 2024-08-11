import "./App.css";
import { useEffect } from "react";
import AllRoutes from "./routes/AllRoutes";
import TopNabar from "./components/Navbar/TopNabar";
// import CircularNav from "./components/Navbar/CircularNav";
// import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileSuccess } from "./redux/user/user.actions";

function App() {
  // console.log(`${process.env.REACT_APP_BASE_URL}`);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer.user);

  // console.log("user app.js",user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getProfileSuccess());
    }
  }, []);

  return (
    <div className="App">
      <TopNabar />
      <AllRoutes />
    </div>
  );
}

export default App;
