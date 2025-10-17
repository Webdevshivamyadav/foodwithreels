const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({

     follower:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
           required:true,
     },
     followingId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User",
           
     },

     followingType: {
          type:String,
          enum:['user','foodPartner'],
          required:true,
     }
},{timestamps:true})

const FollowModel = mongoose.model("follower",followerSchema);

module.exports = FollowModel;