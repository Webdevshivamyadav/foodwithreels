const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authFoodPartner, authUser } = require("../middlewares/auth.middleware");
const foodItemController= require('../controller/foodItem.controller')


const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/',
     authFoodPartner, 
     upload.single("video"),
     foodItemController.addFoodItem

    );

router.get('/foodItems',
    authFoodPartner,
    foodItemController.FetchFoodItem);    

router.post("/like",authUser,foodItemController.saveLike);
router.get("/likeStatus",authUser,foodItemController.getLikeStatus);

module.exports = router;