const FollowModel = require('../model/follower.model.js')
const foodPartnerModel = require('../model/foodPartner.model.js')
const User = require('../model/user.model.js')

const manageFollower = async (req, res) => {

  const userId = req.user?.id || req.foodPartner?.id
  const isuser = !!req.user
  const { id:followingId, type:followingType } = req.query;
  let  requestType = "";
  
  if(req.user){
      requestType =  "user" ;
  }else if(req.foodPartner){
      requestType =  "foodPartner";
  }
  try {
    //checking userId is valid
    if (!userId) {
      return res.status(400).json({
        message: 'User Not Found !'
      })
    }

    // user type validation

    if (!['user', 'foodPartner'].includes(followingType)) {
      return res.status(400).json({
        message: 'Invalid Following Type'
      })
    }

    // user can't follow it self

    if (followingType === 'user' && userId.toString() === followingId) {
      return res.status(400).json({
        message: 'Cannot follow yourself'
      })
    }

    // foodPartner can't follow it self

    if (followingType === 'foodPartner' && userId.toString() === followingId) {
      return res.status(400).json({
        message: 'Cannot follow yourself'
      })
    }
    // Food partner cant't follow it self
    if (followingType === 'foodPartner' && userId.toString() === followingId) {
      return res.status(400).json({
        message: "You can' follow your self"
      })
    }

    // validated userId
    if (followingType === 'user') {
      const validUserId = await User.findById(followingId)

      if (!validUserId) {
        return res.status(400).json({
          message: 'Invalid User '
        })
      }
    }
    // validated foodPartnerId

    if (followingType === 'foodPartner') {
      const validFoodPartnerId = await foodPartnerModel.findById(followingId)

      if (!validFoodPartnerId) {
        return res.status(400).json({
          message: 'Invalid User '
        })
      }
    }

    //  if a user alredy follwing same 'user' , 'foodPartner' .

    const isAlredyFollowed = await FollowModel.findOne({
      follower: userId,
      followingId,
      followingType
    })

    if (isAlredyFollowed) {
      return res.status(400).json({
        message: 'You alredy followed this user.',
        
      })
    }

    // create a newfollow
    const newFollow = await FollowModel.create({
      follower: userId,
      followingId,
      followingType
    })

    // Increment follower and following based on the user request like user, Foodpartner

    if (requestType === "user") {
      await User.findByIdAndUpdate(userId, { $inc: { following: 1 } })
    } else if(requestType === "foodPartner") {
      await foodPartnerModel.findByIdAndUpdate(userId, { $inc: { following: 1 } })
    }

    if (followingType === 'user') {
      await User.findByIdAndUpdate(followingId, { $inc: { follower: 1 } })
    } else if (followingType === 'foodPartner') {
      await foodPartnerModel.findByIdAndUpdate(followingId, { $inc: { follower: 1 } })
    }

    return res.status(201).json({
      message: 'follow sucessfuly '
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server Error' })
  }
}

const manageUnfollow = async (req, res) => {
  try {
    const userId = req.user?.id || req.foodPartner?.id
    const { id: unfollowId, type: unfollowType } = req.query

    // determine who is making the request
    let requestType = ""
    if (req.user) requestType = "user"
    else if (req.foodPartner) requestType = "foodPartner"

    // 🧩 validate user existence
    if (!userId) {
      return res.status(400).json({ message: 'User not found or unauthorized!' })
    }

    // 🧩 validate unfollow type
    if (!['user', 'foodPartner'].includes(unfollowType)) {
      return res.status(400).json({ message: 'Invalid unfollower type!' })
    }

    // 🧩 prevent self-unfollow
    if (userId.toString() === unfollowId) {
      return res.status(400).json({ message: "You can't unfollow yourself!" })
    }

    // 🧩 validate unfollowId in proper model
    if (unfollowType === 'user') {
      const validUser = await User.findById(unfollowId)
      if (!validUser) {
        return res.status(400).json({ message: 'Invalid unfollower ID (user not found)' })
      }
    } else if (unfollowType === 'foodPartner') {
      const validPartner = await foodPartnerModel.findById(unfollowId)
      if (!validPartner) {
        return res.status(400).json({ message: 'Invalid unfollower ID (foodPartner not found)' })
      }
    }

    // 🧩 check if follow record exists
    const isAlreadyFollowed = await FollowModel.findOne({
      follower: userId,
      followingId: unfollowId,
      followingType: unfollowType,
    })

    if (!isAlreadyFollowed) {
      return res.status(400).json({
        message: "You can't unfollow this user because you haven't followed them.",
      })
    }

    // 🧩 perform unfollow
    await FollowModel.findOneAndDelete({
      follower: userId,
      followingId: unfollowId,
      followingType: unfollowType,
    })

    // 🧩 decrement following count for the current user/partner
    if (requestType === 'user') {
      await User.findByIdAndUpdate(userId, { $inc: { following: -1 } })
    } else if (requestType === 'foodPartner') {
      await foodPartnerModel.findByIdAndUpdate(userId, { $inc: { following: -1 } })
    }

    // 🧩 decrement follower count for the unfollow target
    if (unfollowType === 'user') {
      await User.findByIdAndUpdate(unfollowId, { $inc: { follower: -1 } })
    } else if (unfollowType === 'foodPartner') {
      await foodPartnerModel.findByIdAndUpdate(unfollowId, { $inc: { follower: -1 } })
    }

    return res.status(200).json({ success: true, message: 'Unfollowed successfully!' })
  } catch (err) {
    console.error('❌ Unfollow Error:', err)
    return res.status(500).json({ message: 'Server error while unfollowing!' })
  }
}

module.exports = {
  manageFollower,
  manageUnfollow,
}
