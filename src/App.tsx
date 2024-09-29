import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import UserDetail from "./pages/UserDetails";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: any) => state.auth.token);
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
