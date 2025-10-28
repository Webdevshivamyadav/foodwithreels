const { v4: uuid } = require("uuid");
const foodItemModel = require("../model/foodItem.model");
const  UploadToCloudinary = require('../Services/storage.services');
const likeModel = require("../model/Like.model");

const addFoodItem = async (req, res) => {
  try {
    
    
    if (!req.file) {
      return res.status(400).json({ error: "No file to upload" });
    }
    const file = req.file.path
    const fileUploadUrl = await UploadToCloudinary(file, "foodItems");

    const StoreFoodItem = await foodItemModel.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      videoUrl: fileUploadUrl,
      PartnerId: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: StoreFoodItem,
    });
  } catch (error) {
    console.error("Add food error:", error);
    res.status(500).json({ error: error.message });
  }
};


const FetchFoodItem  = async (req, res) =>{
  
    const FoodItems = await foodItemModel.find({});
    res.status(200).json({
       message:"Food Item ",
       FoodItems,
    })
}


// Fetch items based on partner
const FetchPartnerItem = async (req, res) => {
  const { _id } = req.query;
  

  if (!_id) {
    return res.status(400).json({
      message: "No Id Found",
    });
  }

  try {
    const FindItem = await foodItemModel.find({ PartnerId: _id });

    if (!FindItem || FindItem.length === 0) {
      return res.status(404).json({
        message: "No items found for this partner",
      });
    }

    return res.status(200).json({
      message: "Items found successfully",
      items: FindItem,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const saveLike = async (req, res) => {
  try {
    const foodId = req.query.id;
    const userId = req.user?._id;

    // Check authentication
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check food existence
    const foodExists = await foodItemModel.findById(foodId);
    if (!foodExists) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Check if already liked
    const existingLike = await likeModel.findOne({ user: userId, food: foodId });

    if (existingLike) {
      // Unlike: remove like and decrease counter
      await Promise.all([
        likeModel.deleteOne({ _id: existingLike._id }),
        foodItemModel.findByIdAndUpdate(foodId, { $inc: { 
        Likecount: -1 } })
      ]);

      return res.status(200).json({
        message: "Unliked successfully",
        hasLiked: false,
        liked: false
      });
    }

    // Like: create new record and increase counter
    const newLike = await likeModel.create({ user: userId, food: foodId });

    await foodItemModel.findByIdAndUpdate(
    foodId,
    { $inc: { Likecount: 1 } },
    { new: true } // returns the updated document
    );

    return res.status(201).json({
      message: "Food liked successfully",
      hasLiked: true,
      liked: true,
      like: newLike
    });

  } catch (error) {
    console.error("Error in saveLike:", error);
    res.status(500).json({
      message: "Something went to wrong !",
      error: error.message
    });
  }
};

const getLikeStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: foodId } = req.query;

    // Correct field names
    const existingLike = await likeModel.findOne({ user: userId, food: foodId });

    res.status(200).json({ hasLiked: !!existingLike });
  } catch (error) {
    res.status(500).json({ message: "Error checking like", error });
  }
};

// get food item for cart 

const getFoodItem = async(req,res)=>{
  const id = req.query?.id;
  if(!id){
    return res.status(400).json({
      message:"please provide the valid id",
    })
  }

  try {
        const getItem = await foodItemModel.findById(id).sort({createdAt:-1});
        
        if(getItem){
          return res.status(200).json({
            message:"food item founded",
            getItem
          })
        }
  } catch (error) {
       return res.status(500).json({
        message:"something went wrong!"
       })
  }
}

module.exports = { addFoodItem, FetchFoodItem ,FetchPartnerItem,saveLike,getLikeStatus,getFoodItem};
