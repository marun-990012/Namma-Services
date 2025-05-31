import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute(props) {
//   const { isLoggedIn,data } = useSelector((state) => state.profile);
  const token = localStorage.getItem("token");

  if (token) {
    return props.children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default PrivateRoute;