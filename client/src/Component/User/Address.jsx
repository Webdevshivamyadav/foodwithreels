import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Mail, Phone } from "lucide-react";

const Address = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("⚠️ Please fill all fields!");
      return;
    }
    console.log("Address Submitted:", form);
    alert("✅ Address saved successfully!");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 px-6 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-lg"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <MapPin className="text-blue-600" /> Delivery Address
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
              <Home className="text-gray-400 mr-2" />
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
              <Phone className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, landmark..."
              rows="3"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none bg-transparent resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none bg-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border border-gray-300 rounded-xl p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="e.g., 110001"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none bg-transparent"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Save Address
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Address;
