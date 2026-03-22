export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, Admin
        </h2>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-gray-800">
            🔔
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
