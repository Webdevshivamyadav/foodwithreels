import { useState, useCallback } from "react";

import { motion } from 'framer-motion';
import BottomMenu from "./BottomMenu";
import { useNavigate } from "react-router";
import api from "../../api/api";

// import motion  from "framer-motion";

function SearchProfile() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(2) // default Reels
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 
  
  // Debounce helper
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() =>
        fn(...args), delay
    );
    };
  };

  // 🌐 API call — merge user + foodPartner into one array
  const fetchResults = async (value) => {
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(
        `/users/search?query=${value}`
       
      );

      const { profiles } = res.data;

      // Combine users + foodPartners into a single array
      const merged = [
        ...(profiles.user || []),
        ...(profiles.foodPartner || []),
      ];

      setResults(merged);
    } catch (err) {
      console.error("Search error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowProfile = (id,type) => {
  
  navigate(`/user/showProfileCard/${id}/${type}`);

};

// handle follow 




  const debouncedSearch = useCallback(debounce(fetchResults, 1000), []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Search</h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search profiles..."
            value={query}
            onChange={handleSearch}
            className="w-full rounded-2xl border border-gray-300 bg-gray-100 py-3 px-5 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {loading && (
            <div className="absolute right-4 top-3 text-gray-500 animate-pulse">
              <span className="text-sm">Searching...</span>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {!loading && query.length > 1 && (
        <div className="w-full max-w-xl mt-6 space-y-3">
          {results.length > 0 ? (
            results.map((user) => (
              <motion.div
                key={user._id}
                onClick={()=>handleShowProfile(user._id,user.type)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 shadow-sm cursor-pointer transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.profileUrl || "https://via.placeholder.com/48"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">
                      Followers: {user.follower ?? 0} • Following: {user.following ?? 0}
                    </p>
                  </div>
                </div>

                <button >
                x
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm mt-6 italic">
              No profiles found.
            </p>
          )}
        </div>
      )}
     {/* <BottomMenu activeTab={activeTab}/> */}
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default SearchProfile;
