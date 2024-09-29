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
  const login = (token: string) => {
    dispatch(setToken(token));
    navigate("/dashboard");
  };

  const logout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  return {
    isAuthenticated,
    token,
    login,
    logout,
  };
};

export default useAuth;
