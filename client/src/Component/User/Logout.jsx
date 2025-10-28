import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post("/users/logout");
      toast.success(response.data.message || "Logged out successfully ✅");

      // clear local session + redux state
      sessionStorage.clear();
      dispatch(logoutUser());

      // redirect
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed ❌");
      
    }
  };

  return (
    <div className="bg-white text-black h-20 w-32 absolute right-2 top-10 rounded-2xl shadow-md flex items-center justify-center transition-all duration-300 md:right-100 md:top-14">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
