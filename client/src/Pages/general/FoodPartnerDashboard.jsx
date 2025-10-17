import React, { useState } from "react";
import {
  Plus,
  Users,
  DollarSign,
  Utensils,
  Menu,
  Search,
  Home,
  LayoutGrid,
  BarChart,
  User,
} from "lucide-react";
import AddItem from "../../Component/FoodPartner/AddItem";
import Item from "../../Component/FoodPartner/Item";

export default function FoodDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const foodPartner = JSON.parse(sessionStorage.getItem("foodPartner"));
  const partner = {
    name: foodPartner?.name || "Partner Name",
    email: foodPartner?.email || "email@example.com",
    phone: foodPartner?.phone || "9999999999",
    logo: foodPartner?.profileUrl || "https://i.pravatar.cc/80",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <header className="md:hidden flex justify-between items-center bg-white p-4 shadow sticky top-0 z-20">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-bold text-blue-600">🍴 FoodDash</h1>
        <img
          src={partner.logo}
          alt="Profile"
          className="w-9 h-9 rounded-full border"
        />
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static z-30 w-60 h-full bg-white shadow-lg flex flex-col p-6 transition-transform duration-300`}
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 hidden md:block">
          🍴 FoodDash
        </h2>
        <nav className="flex flex-col space-y-4 text-gray-700 text-base font-medium">
          <a href="#" className="hover:text-blue-600 flex items-center gap-2">
            <Home size={18} /> Dashboard
          </a>
          <a href="#" className="hover:text-blue-600 flex items-center gap-2">
            <Utensils size={18} /> Foods
          </a>
          <a href="#" className="hover:text-blue-600 flex items-center gap-2">
            <Users size={18} /> Partners
          </a>
          <a href="#" className="hover:text-blue-600 flex items-center gap-2">
            <BarChart size={18} /> Analytics
          </a>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-x-hidden">
        {/* Search + Admin */}
        <div className="hidden md:flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
          <div className="flex items-center gap-3 w-1/2">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search foods..."
              className="w-full p-2 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium">Admin</span>
            <img
              src={partner.logo}
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<Utensils />} title="Total Foods" value={Item.length} />
          <StatCard icon={<Users />} title="Partners" value="1" />
          <StatCard icon={<DollarSign />} title="Revenue" value="₹50,000" />
        </div>

        {/* Partner Card */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row items-center sm:items-start sm:gap-6 mb-6">
          <img src={partner.logo} alt="Partner" className="w-20 h-20 rounded-full mb-3 sm:mb-0" />
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold">{partner.name}</h2>
            <p className="text-gray-600 text-sm">{partner.email}</p>
            <p className="text-gray-600 text-sm">{partner.phone}</p>
          </div>
        </div>

        {/* Food Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Food Items</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <Plus size={18} /> Add Food
            </button>
          </div>

          <table className="w-full text-left min-w-[500px]">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Preview</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <Item />
            </tbody>
          </table>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow flex justify-around py-2">
        <NavIcon icon={<Home size={22} />} label="Home" />
        <NavIcon icon={<Utensils size={22} />} label="Foods" />
        <NavIcon icon={<Users size={22} />} label="Partners" />
        <NavIcon icon={<User size={22} />} label="Profile" />
      </nav>

      {/* Add Food Modal */}
      {showModal && (
        <AddItem
          onClose={() => setShowModal(false)}
          Modal={({ children, onClose }) => (
            <Modal onClose={onClose}>{children}</Modal>
          )}
        />
      )}
    </div>
  );
}

/* Components */
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function NavIcon({ icon, label }) {
  return (
    <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
