import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // send cookies with requests
});

// Add interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Session expired or unauthorized access");

      // Show toast only once (avoid multiple popups if many API calls fail)
      if (!window.__sessionExpiredToastShown) {
        toast.error("Session expired. Please log in again.");
        window.__sessionExpiredToastShown = true;

        try {
          // Wait for logout before redirecting
          await api.post("/users/logout", {}, { withCredentials: true });
        } catch (logoutError) {
          console.error("Logout API failed:", logoutError);
        }

        // Clear client-side data (optional but good practice)
        sessionStorage.clear();
        localStorage.removeItem("token"); // only if you store it
        setTimeout(() => {
          window.location.href = "/login";
          window.__sessionExpiredToastShown = false;
        }, 1500);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
