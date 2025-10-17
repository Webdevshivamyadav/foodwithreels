const express = require('express')
const router = express.Router()
const foodPartnerController = require('../controller/FoodPartnerAuth.controller')
const foodItemController = require('../controller/foodItem.controller')
const { authFoodPartner } = require('../middlewares/auth.middleware')
const { manageFollower, manageUnfollow } = require('../controller/follower.controller')
const multer = require('multer')

const storage = multer.diskStorage({})
const upload = multer({ storage })

router.post('/register', upload.single('profileImage'), foodPartnerController.registerFoodPartner)
router.post('/login', foodPartnerController.loginFoodPartner)
router.post('/logout', foodPartnerController.loginFoodPartner)
router.get('/FetchPartnerItem', foodItemController.FetchPartnerItem)

// follow and unfollow users and foodPartners

router.post('/follow', authFoodPartner, manageFollower)
router.post('/unfollow', authFoodPartner, manageUnfollow)

module.exports = router
