import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/products", label: "Products", icon: "📦" },
  { path: "/orders", label: "Orders", icon: "🛒" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold">Saleor Dashboard</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
              location.pathname === item.path
                ? "bg-gray-700 border-l-4 border-primary-500"
                : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
