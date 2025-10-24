const mongoose = require('mongoose');
const Like = require('./Like.model');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: String , required: true },
  paymentId: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  razorpaySignature: { type: String, required: true },
  items: [
    {
      productId: { type: String,required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      Likes: { type:Number, required: true,},
      PartnerId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: String, required: true },
      videoUrl: { type: String, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'INR' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
