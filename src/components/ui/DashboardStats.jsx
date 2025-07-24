import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";

function DashboardStats() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, spaces: 0 });
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem("session");

  useEffect(() => {
    fetch("http://localhost:5000/stats", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load dashboard stats");
        setLoading(false);
      });
  }, []);

  return (
    <div className=" bg-gradient-to-b from-[#0F555C] to-[#20B4C2] text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wide drop-shadow-lg">
        Dashboard Summary
      </h1>

      {loading ? (
        <p className="text-center animate-pulse">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard title="Total Users" count={stats.users} />
          <StatCard title="Total Bookings" count={stats.bookings} />
          <StatCard title="Total Spaces" count={stats.spaces} />
        </div>
      )}
    </div>
  );
}

function StatCard({ title, count }) {
  return (
    <Card className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-lg text-center py-6">
      <CardContent>
        <h2 className="text-xl font-semibold text-white/90">{title}</h2>
        <p className="text-4xl font-bold text-green-300 mt-2">{count}</p>
      </CardContent>
    </Card>
  );
}

export default DashboardStats;
