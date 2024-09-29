import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/api"; // Assume this is the API function to fetch a user by ID
import Card from "../components/Card";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from route params
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const fetchUser = async () => {
    if (userId) {
      try {
        const { data } = await getUserById(userId);
        setUser(data.data);
      } catch (err) {
        setError("Error fetching user details");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">User Details</h2>
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-100 h-50 "
        />
        <p>
          <strong>Name:</strong> {user.first_name} {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </Card>
  );
};

export default UserDetail;
