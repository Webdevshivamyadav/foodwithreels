import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart } from "lucide-react";

const sampleVideos = [
  {
    id: 1,
    title: "Nature Vibes",
    price: 199,
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Travel Adventure",
    price: 249,
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Food Magic",
    price: 299,
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const toggleCart = (video) => {
    if (cart.find((v) => v.id === video.id)) {
      setCart(cart.filter((v) => v.id !== video.id));
    } else {
      setCart([...cart, video]);
    }
  };

  const total = cart.reduce((sum, v) => sum + v.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🎬 Video Store Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side – All Videos */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Available Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {sampleVideos.map((video) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3"
                whileHover={{ scale: 1.03 }}
              >
                <video
                  src={video.src}
                  controls
                  className="rounded-lg w-full h-56 object-cover"
                ></video>

                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="font-medium text-gray-800">{video.title}</p>
                    <p className="text-sm text-gray-500">₹{video.price}</p>
                  </div>

                  <button
                    onClick={() => toggleCart(video)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      cart.find((v) => v.id === video.id)
                        ? "bg-red-500 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {cart.find((v) => v.id === video.id)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side – Bill Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingCart className="text-blue-600" /> Your Bill
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty 🛒</p>
          ) : (
            <>
              <ul className="space-y-3 mb-4">
                {cart.map((v) => (
                  <li
                    key={v.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{v.title}</p>
                      <p className="text-sm text-gray-500">₹{v.price}</p>
                    </div>
                    <button
                      onClick={() =>
                        setCart(cart.filter((x) => x.id !== v.id))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>GST (18%)</span>
                  <span>₹{(total * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>₹{(total * 1.18).toFixed(2)}</span>
                </div>

                <button
                  className="w-full mt-6 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  onClick={() => alert("Checkout successful ✅")}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
