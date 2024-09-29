import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/authSlice";
import InputField from "../components/InputField";
import { RootState } from "../store/store";
import Card from "../components/Card";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const { data } = await register(email, password);
      dispatch(setToken(data.token));
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <Card>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}{" "}
            <div className="space-y-2">
              <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <InputField
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SignUp;
