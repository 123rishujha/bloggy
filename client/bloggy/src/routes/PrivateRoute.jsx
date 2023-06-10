import { useSelector,useDispatch } from 'react-redux';
import { Navigate,useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) =>{
    const isAuth = useSelector((store)=>store.userReducer.isAuth);
    const location = useLocation();
    
    let obj = {data: location?.pathname}
    
    // console.log("user from PrivateRoute",isAuth);
    if(!isAuth){
        return <Navigate to='/' state={obj} />
    }
    return children;
}

export default PrivateRoute;

