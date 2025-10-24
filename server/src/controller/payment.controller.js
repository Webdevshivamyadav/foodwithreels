const { createOrder } = require('../Services/payment.services')
const { Order } = require('../model/orders.model')

const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, cart } = req.body

    console.log('🛒 Cart received:', cart)
    console.log('Creating payment order:', { amount, currency, receipt })

    // Validate cart
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty or invalid' })
    }

    // Create Razorpay order
    const order = await createOrder(amount, currency, receipt)

    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' })
    }

    res.status(200).json({ success: true, order })
  } catch (error) {
    console.error('Payment order creation failed:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const paymentConfirmation = async (req, res) => {
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    paymentStatus,
    cart,
    amount,
    currency
  } = req.body
  console.log(req.body)
  try {
    if (paymentStatus === 'success') {
      const items = cart.map((item) => ({
        productId: item._id,
        quantity: item.qty,
        price: item.price,
        videoUrl: item.videoUrl,
        name: item.name,
        Likes: item.Likecount,
        description: item.description,
        PartnerId: item.PartnerId
      }))

      // Save order details in DB
      const saveOrderDetails = await Order.create({
        userId: req.user._id,
        items,
        totalAmount: amount,
        currency,
        status: 'pending',
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        paymentStatus: paymentStatus,
        razorpaySignature: razorpaySignature
      })
      if (saveOrderDetails) {
        res.status(200).json({
          success: true,
          message: 'Payment confirmed and order saved',
          savedOrder: saveOrderDetails
        })
      }
    }
  } catch (error) {
    console.error('Payment confirmation failed:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { createPaymentOrder, paymentConfirmation }
