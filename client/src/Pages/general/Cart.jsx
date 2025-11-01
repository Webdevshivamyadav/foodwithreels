import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, ShoppingCart, Play, Currency } from 'lucide-react'
import api from '../../api/api'
import { useParams } from 'react-router'
import Address from '../../Component/User/Address'
import BackButton from '../../Component/User/Backbutton'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [foodItem, setFoodItem] = useState([])
  const { id } = useParams()

  useEffect(() => {
    handleFetchFoodItems(id)
  }, [id])

  const handleFetchFoodItems = async (id) => {
    try {
      const response = await api.get(`foodItem/getItem?${id}`)
      const item = response.data.getItem
      localStorage.setItem('cartItem', JSON.stringify([item]))
      setFoodItem([item])
    } catch (error) {
      console.log(error)
    }
  }

  // ✅ Add/Remove item from cart
  const toggleCart = (video) => {
    const existing = cart.find((v) => v._id === video._id)
    if (existing) {
      setCart(cart.filter((v) => v._id !== video._id))
    } else {
      setCart([...cart, { ...video, qty: 1 }])
    }
  }

  // ✅ Handle Payment
  const handlePayment = async (total) => {
    try {
      console.log('Initiating payment for cart:', total)

      // 1️⃣ Get Razorpay key
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID

      // 2️⃣ Create an order on the backend
      const response = await api.post('/users/create-payment-order', {
        amount: Math.round(total), // backend expects paise
        currency: 'INR',
        receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
        cart: cart // send cart details to backend
      })

      console.log('Payment Order Response:', response.data)

      if (!response.data?.order?.id) {
        throw new Error('Order ID not received from backend')
      }

      const { order } = response.data

      // 3️⃣ Setup Razorpay options
      const options = {
        key,
        amount: order.amount, 
        currency: order.currency, 
        name: 'Foodie Reels',
        description: 'Test Transaction',
        order_id: order.id, 
        handler: async function (response,) {
          console.log('Payment Success:', response)
          alert('Payment Successful!')

          try {
            const SetPaymentStatus = await api.post('/users/confirm-payment', {
              amount: Math.round(order.amount / 100), // convert back to rupees
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,

              paymentStatus: 'success',
              cart: cart,
              currency: 'INR'
            })
            setCart([]);
            console.log('Payment status updated on backend:', SetPaymentStatus.data)
          } catch (error) {
            console.error('Payment Confirmation Error:', error)
          }
          // You can call your backend here to verify the payment signature
        },
        prefill: {
          name: 'shivam yadav',
          email: 'shivam.yadav@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        }
      }

      // 4️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options)
      rzp.open()

      rzp.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error)
        alert('Payment Failed. Please try again.')
      })
    } catch (error) {
      console.error('Payment Error:', error)
    }
  }

  // ✅ Update quantity for each item
  const updateQty = (id, newQty) => {
    if (newQty < 1) return
    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, qty: parseInt(newQty) } : item))
    )
  }

  // ✅ Dynamic total calculation
  const subtotal = cart.reduce((sum, v) => sum + v.price * v.qty, 0)
  const gst = subtotal * 0.18
  const total = subtotal + gst

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 px-4 sm:px-10 font-[Poppins]">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Side – All Videos */}
        <div className="lg:col-span-2">
          <div className='flex items-center mb-6 justify-between'>
          <h2 className="text-2xl font-semibold  text-gray-800">Available Item</h2>
           <BackButton /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {foodItem.map((video) => {
              const inCart = cart.find((v) => v._id === video._id)
              return (
                <motion.div
                  key={video._id}
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl overflow-hidden group transition-all"
                >
                  <div className="relative">
                    <video
                      src={video.videoUrl}
                      muted
                      loop
                      className="w-full h-56 object-cover rounded-t-3xl group-hover:brightness-75 transition"
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    ></video>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play
                        className="text-white bg-blue-600/70 p-3 rounded-full backdrop-blur-md"
                        size={40}
                      />
                    </motion.div>
                  </div>

                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{video.name}</p>
                      <p className="text-gray-500 text-sm">₹{video.price}</p>
                    </div>

                    <button
                      onClick={() => toggleCart(video)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                        inCart
                          ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md'
                      }`}
                    >
                      {inCart ? 'Remove' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Side – Bill Section */}
        <motion.div
          className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl p-6 h-fit sticky top-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <ShoppingCart className="text-blue-600" /> Your Bill
          </h2>

          {cart.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-sm text-center mt-10"
            >
              Your cart is empty 🛒
            </motion.p>
          ) : (
            <>
              <ul className="space-y-3 mb-6">
                {cart.map((v) => (
                  <motion.li
                    key={v._id}
                    className="flex justify-between items-center border-b pb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div>
                      <p className="font-medium text-gray-800">{v.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{v.price} × {v.qty} = ₹{v.price * v.qty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={v.qty}
                        onChange={(e) => updateQty(v._id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {[1, 2, 3, 4, 5].map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setCart(cart.filter((x) => x._id !== v._id))}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="border-t pt-4 space-y-2 text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl transition-all"
                  onClick={() => handlePayment(total)}
                >
                  Checkout Securely
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
