import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("user") !== null;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return loggedIn ? children : null;
};

export default PrivateRoute;
