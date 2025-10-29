const express = require('express')
const router = express.Router()
const authcontroller = require('../controller/auth.controller')
const User = require('../model/user.model')
const foodItemController = require('../controller/foodItem.controller')
const FooodPartnerController = require('../controller/FoodPartnerAuth.controller')
const { authUser } = require('../middlewares/auth.middleware')
const { manageFollower, manageUnfollow } = require('../controller/follower.controller')
const multer = require('multer')
const paymentController = require('../controller/payment.controller')
const { createComment, getAllComments } = require('../controller/comment.controller')
const storage = multer.diskStorage({})
const upload = multer({ storage })

// ========  Authrized user routes  ===========

router.post('/register', upload.single('profileImage'), authcontroller.register)
router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)
router.put('/updateUser', authUser, authcontroller.updateUser);
// ========  Fetch data form foodPartner and manage routes  ===========

router.get('/FetchFoodPartner', authUser, FooodPartnerController.FetchFoodPartner);

// fetch all liked post 

router.get('/likedpost' , authUser, authcontroller.fetchUserLikePost)
// ====== Fetch all profiles user and foodPartners ==============

router.get("/search",authUser,authcontroller.fetchallUserFoodPartner);

// ========  User payment update routes  ===========

router.post('/create-payment-order', authUser, paymentController.createPaymentOrder);
router.post('/confirm-payment', authUser, paymentController.paymentConfirmation);
// ========  Manage follow and unfollow routes   ===========

router.get('/myorders',authUser, authcontroller.getMyOrder);
//==== comment routes ======

router.post('/addComment',authUser, createComment);
router.get('/getAllComments', authUser, getAllComments);

router.post('/follow', authUser, manageFollower)
router.post('/unfollow', authUser, manageUnfollow)
router.get('/showProfileCardUser',authUser, authcontroller.showProfileCardUser);
router.get('/fetchIsAlredyFollowed',authUser,authcontroller.fetchIsAlredyFollowed);
module.exports = router
