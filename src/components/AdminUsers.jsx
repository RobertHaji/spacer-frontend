import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // your JWT token
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="py-2 px-4 border-b">{u.id}</td>
              <td className="py-2 px-4 border-b">{u.name}</td>
              <td className="py-2 px-4 border-b">{u.email}</td>
              <td className="py-2 px-4 border-b">{u.is_admin ? "Admin" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
