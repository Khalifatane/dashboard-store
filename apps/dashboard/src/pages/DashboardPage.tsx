import { useEffect, useState } from "react";
import { getProducts } from "@repo/api-client";
import { Button, LoadingSpinner } from "@repo/ui";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const productsResponse = await getProducts();
        // Mock stats - in production, these would come from the API
        setStats({
          totalProducts: productsResponse.totalCount,
          totalOrders: 156,
          totalRevenue: 24580.5,
          activeUsers: 42,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = [
    { label: "Total Products", value: stats?.totalProducts || 0, color: "bg-blue-500" },
    { label: "Total Orders", value: stats?.totalOrders || 0, color: "bg-green-500" },
    { label: "Total Revenue", value: `$${stats?.totalRevenue.toFixed(2) || "0.00"}`, color: "bg-purple-500" },
    { label: "Active Users", value: stats?.activeUsers || 0, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
              📊
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button>Add New Product</Button>
          <Button variant="secondary">View Orders</Button>
          <Button variant="outline">Generate Report</Button>
        </div>
      </div>
    </div>
  );
}
