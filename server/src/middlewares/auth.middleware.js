const foodPartnerModel = require('../model/foodPartner.model');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const authFoodPartner = async (req,res,next) =>{

   const token = req.cookies.token;

   if(!token){
    res.status(400).json({
        message:"Please login required"
     })

    return 
   }
  
  const decode = jwt.verify(token,process.env.JWT_SECRET);
  const foodPartner =  await foodPartnerModel.findById(decode.id);

  req.foodPartner  = foodPartner ;
  
  next()
 
}

const authUser = async (req,res,next) =>{

   const token = req.cookies.token;

   if(!token){
     res.status(400).json({
        message:"Please login required"
     })
    return 
   }
  
  const decode = jwt.verify(token,process.env.JWT_SECRET);
  
  const user  = await User.findById(decode.id);

  req.user  = user ;

  next()
 
}

module.exports = {
    authFoodPartner,
    authUser,
}