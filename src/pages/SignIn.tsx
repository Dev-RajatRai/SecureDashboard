import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../store/authSlice";
import { login } from "../services/api";
import { RootState } from "../store/store";
import Card from "../components/Card";
import InputField from "../components/InputField";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const validateForm = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await login(email, password);
      dispatch(setToken(data.token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <Card>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-center text-2xl font-bold">Sign In</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
            <div className="mb-4">
              <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>
          <p className="text-center">
            New User ?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register{" "}
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SignIn;
