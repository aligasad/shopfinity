import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../loader/Loader.jsx';
import { auth } from "../../firebase/FirebaseConfig.jsx";
import { useAuth } from "./AuthContext.jsx";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, []); //mounting

  if (isLoading)
    return (
      <Loader />
    );

  if (!user) return navigate("/login");

  return children;
}

export default ProtectedRoute;