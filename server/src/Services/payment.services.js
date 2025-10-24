const razorpay = require("razorpay");

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZAORPAY_KEY_SECRET,
});


const createOrder = async (amount, currency, receipt) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency,
      receipt: receipt,
    };
    const response = await instance.orders.create(options);
    return response;
  } catch (error) {
    throw new Error("Error creating Razorpay order");
  }
};


module.exports = {
  createOrder,
  
};
