import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/authSlice";
import Card from "../components/Card";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  if (!token) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center">Dashboard</h2>
        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
              <Card key={user.id}>
                {" "}
                <Link
                  to={`/user/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}{" "}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <p>
            Page {page} of {totalPages}
          </p>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
