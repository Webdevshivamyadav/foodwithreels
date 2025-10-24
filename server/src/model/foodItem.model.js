const mongoose = require('mongoose');
const foodPartnerModel = require('./foodPartner.model')
const foodItemSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    
    Likecount: {
    type: Number,
    default: 0,
    required: true,
},
    commentCount: {
    type: Number,
    default: 0,
    required: true,
},
    PartnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodPartner",
        required:true,
        
    }
})

const foodItem = mongoose.model("foodItem",foodItemSchema);

module.exports= foodItem;