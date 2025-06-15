import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAccount } from "../redux/slices/profileSlice";

export default function ProtectedRoute({ roles, children }) {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAccount());
  },[dispatch])
  const userAccount = useSelector((state) => state.profile)?.data;
  const navigate = useNavigate();

  const isLoading = !userAccount || Object.keys(userAccount).length === 0;
  const isAuthorized = roles.includes(userAccount?.userType);

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      if (window.history.length > 2) {
        navigate(-1);
      } else if (localStorage.getItem("token")) {
        navigate("/profile", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [isLoading, isAuthorized, navigate]);

  if (isLoading) return null;
  if (isAuthorized) return children;

  return null; // already redirected
}
