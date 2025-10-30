const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UploadToCloudinary = require('../Services/storage.services')
const User = require('../model/user.model')
const foodPartnerModel = require('../model/foodPartner.model')
const Like = require('../model/Like.model')
const FollowModel = require('../model/follower.model')
const {Order} = require('../model/orders.model')
// Register a new user

const register = async (req, res) => {
  const { name, email, password } = req.body
  const ProfileImage = req.file.path

  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const GetImageUrl = await UploadToCloudinary(ProfileImage, 'UserProfile')
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      profileUrl: GetImageUrl
    })

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // or "none" if using localhost + https together
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        follower: newUser.follower,
        following: newUser.following,
        profileUrl: newUser.profileUrl,
        type: newUser.type
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message
    })
  }
}

//  Login a new user

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await userModel.findOne({ email })

    if (!existingUser) {
      return res.status(400).json({
        message: 'Invalid email and password'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid email and password'
      })
    }
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        follower: existingUser.follower,
        following: existingUser.following,
        profileUrl: existingUser.profileUrl,
        type: existingUser.type
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message
    })
  }
}

// Logout a user

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: 'true',
    sameSite: 'none', // or "none" if using localhost + https together
    path: '/login'
  })
  req.session?.destroy?.()
  res.status(200).json({
    message: 'User logged out successfully'
  })
}

// Update user profile

const updateUserProfile = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      message: 'Invalid user Id !'
    })
  }
  try {
    const isexistingUser = await User.findById(id)
    if (!isexistingUser) {
      return res.status.json({
        message: 'user not a existing user'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error !'
    })
  }
}

const fetchallUserFoodPartner = async (req, res) => {
  const { query } = req.query
  const currentUserId = req.user?.id

  if (!query) {
    return res.status(400).json({
      message: 'Invalid search'
    })
  }
  try {
    const fetchUser = await User.find({ name: { $regex: query, $options: 'i' } }).select(
      'name follower following profileUrl email type'
    )

    const fetchFoodPartner = await foodPartnerModel
      .find({ name: { $regex: query, $options: 'i' } })
      .select('name shopName email profileUrl follower following type')

    if (fetchUser && fetchFoodPartner) {
      if (fetchUser.length > 0 || fetchFoodPartner.length > 0) {
        return res.status(200).json({
          message: 'Profile fetch sucessfully',
          profiles: {
            user: fetchUser,
            foodPartner: fetchFoodPartner
          }
        })
      } else {
        return res.status(200).json({
          message: 'No result Found'
        })
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Inernal Server error'
    })
  }
}

const fetchUserLikePost = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      message: 'invalid user id '
    })
  }

  try {
    const fetchliked = await Like.find({ user: id }).populate('food')

    if (fetchliked) {
      return res.status(200).json({
        message: 'liked post finded',
        fetchliked
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const showProfileCardUser = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      message: 'No user provided'
    })
  }

  try {
    const findUserFromUserdb = await User.findById(id)
    if (findUserFromUserdb) {
      return res.status(200).json({
        message: 'user founded !',
        user: {
          name: findUserFromUserdb.name,
          email: findUserFromUserdb.email,
          follower: findUserFromUserdb.follower,
          following: findUserFromUserdb.following,
          profile: findUserFromUserdb.profileUrl
        }
      })
    }

    const findUserFromFoodPartner = await foodPartnerModel.findById(id)
    if (findUserFromFoodPartner) {
      return res.status(200).json({
        message: 'user founded',
        user: {
          name: findUserFromFoodPartner.name,
          email: findUserFromFoodPartner.email,
          follower: findUserFromFoodPartner.follower,
          following: findUserFromFoodPartner.following,
          profile: findUserFromFoodPartner.profileUrl
        }
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: 'something went wrong !'
    })
  }
}

const fetchIsAlredyFollowed = async (req, res) => {
  const { profileId } = req.query
  const currentUserId = req.user.id

  if (!profileId) {
    return res.status(400).json({
      message: 'Invalid ids'
    })
  }

  try {
    const findFollowedStatus = await FollowModel.findOne({
      follower: currentUserId,
      followingId: profileId
    })

    if (findFollowedStatus) {
      return res.status(200).json({
        message: 'You alredy followed this account',
        isfollowed: true
      })
    } else {
      return res.status(200).json({
        message: 'You alredy not this account',
        isfollowed: false
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'something went wrong!'
    })
  }
}

const getMyOrder = async (req, res) => {
 
  const {id} = req.query
  
  try {
    const orders = await Order.find({ userId: id });
    if(orders){
     return res.status(200).json({
      message: 'Orders fetched successfully',
      orders
    })
    }
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const updateUser = async (req, res) =>{
  const { id } = req.body;
  
  const { name, email } = req.body;
  if (!id) {
    return res.status(400).json({
      message: 'Invalid user Id !'
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }                 
    const updatedUser = await User.findByIdAndUpdate(id,{
      name: user.name,
      email: user.email
    } , { new: true });

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  fetchallUserFoodPartner,
  fetchUserLikePost,
  showProfileCardUser,
  fetchIsAlredyFollowed,
  getMyOrder,
  updateUser
}
