import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setToken, clearToken } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

interface UseAuthReturn {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const isAuthenticated = Boolean(token);

  // Handles login by storing the token in Redux state
  const login = (token: string) => {
    dispatch(setToken(token));
    navigate("/dashboard"); // Redirect to dashboard after successful login
  };

  // Handles logout by clearing the token and navigating to login page
  const logout = () => {
    dispatch(clearToken());
    navigate("/"); // Redirect to login page after logout
  };

  return {
    isAuthenticated,
    token,
    login,
    logout,
  };
};

export default useAuth;
