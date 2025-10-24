import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Package, Clock } from "lucide-react";
import api from "../../api/api"; // adjust path if needed
import Backbutton from "../../Component/User/Backbutton";
import BottomMenu from "../../Component/User/BottomMenu";

const Myorder = () => {
  const [activeTab, setActiveTab] = useState(3);
  const [orders, setOrders] = useState([]);
  const { id } = JSON.parse(sessionStorage.getItem("user")) || {};
  console.log("user", id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/users/myorders?id=${id}`);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    if (id) fetchOrders();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-5 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3"
        >
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-indigo-600 dark:text-indigo-400 " /> My Orders
            </div>
            <Backbutton />
          </div>
          
        </motion.h1>
           
        {/* Empty orders */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 text-center"
          >
            <Package className="mx-auto text-gray-400 w-12 h-12 mb-3" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              You haven't placed any orders yet.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition-all p-5"
              >
                {/* Order header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Order #{order._id?.slice(-6).toUpperCase()}
                  </h2>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                    }`}
                  >
                    {order.status || "pending"}
                  </span>
                </div>

                {/* Order items */}
                <div className="space-y-3">
                  {order.items?.map((item, i) => (
                    <VideoCard key={i} item={item} />
                  ))}
                </div>

                {/* Order footer */}
                <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom menu */}
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Myorder;

/* ---------------------------
   VideoCard Component
---------------------------- */
const VideoCard = ({ item }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-xl p-3">
      <div className="flex items-center gap-4">
        <video
          ref={videoRef}
          src={item.videoUrl}
          onClick={handleVideoClick}
          className="w-24 h-24 rounded-lg object-cover cursor-pointer"
          controls={false} // hide default controls
        />
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Qty: {item.quantity}
          </p>
        </div>
      </div>
      <span className="font-semibold text-gray-800 dark:text-white">
        ₹{item.price}
      </span>
    </div>
  );
};
