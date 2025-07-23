import { useEffect, useState } from "react";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the current user
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setCurrentUser(data);

        // If user is admin, fetch all users
        if (data.role === "admin") {
          fetch("/api/users")
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch users");
              return res.json();
            })
            .then((usersData) => setAllUsers(usersData))
            .catch((err) => setError(err.message));
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!currentUser) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <div className="bg-white shadow rounded p-4 mb-8">
        <p><span className="font-semibold">Name:</span> {currentUser.name}</p>
        <p><span className="font-semibold">Email:</span> {currentUser.email}</p>
        <p><span className="font-semibold">Role:</span> {currentUser.role}</p>
      </div>

      {currentUser.role === "admin" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Users</h2>
          <div className="bg-white shadow rounded p-4">
            {allUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <ul className="divide-y">
                {allUsers.map((user) => (
                  <li key={user.id} className="py-2">
                    <p><span className="font-medium">{user.name}</span> — {user.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
