// src/components/BackButton.jsx
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react"; // optional icon lib

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-700 hover:text-black font-medium transition"
    >
      <ArrowLeft size={20} />
      {label}
    </button>
  );
}
