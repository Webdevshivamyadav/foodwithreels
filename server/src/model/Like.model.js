const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodItem",
      required: true,
    },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like
