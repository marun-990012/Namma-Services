import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ roles, children }) {
  const  data  = useSelector((state) => state.profile);
  const navigate = useNavigate();

  console.log(data)

  const isLoading = !data || Object.keys(data).length === 0;
  const isAuthorized = roles.includes(data?.role);

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
