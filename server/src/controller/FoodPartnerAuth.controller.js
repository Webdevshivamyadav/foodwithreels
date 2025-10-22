const foodPartnerModel = require('../model/foodPartner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const foodItemModel = require('../model/foodItem.model')
const UploadToCloudinary = require('../Services/storage.services')

// Register a new food partner

const registerFoodPartner = async (req, res) => {
  const { name, shopName, email, password, phone } = req.body
  const ProfileImage = req.file.path
  try {
    const existingFoodPartner = await foodPartnerModel.findOne({ email })
    if (existingFoodPartner) {
      return res.status(400).json({
        message: 'Food Partner already exists'
      })
    }
    const GetImageUrl = await UploadToCloudinary(ProfileImage, 'FoodPartnersProfile')
    const hashedPassword = await bcrypt.hash(password, 10)

    const newFoodPartner = await foodPartnerModel.create({
      name,
      shopName,
      email,
      password: hashedPassword,
      phone,
      profileUrl: GetImageUrl
    })

    const token = jwt.sign({ id: newFoodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.cookie('token', token,{
      httpOnly: true,
      secure: 'true',
      sameSite: "none", // or "none" if using localhost + https together
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    res.status(201).json({
      message: 'Food Partner registered successfully',
      foodPartner: {
        _id: newFoodPartner._id,
        name: newFoodPartner.name,
        email: newFoodPartner.email,
        shopName: newFoodPartner.shopName,
        phone: newFoodPartner.phone,
        profileUrl: newFoodPartner.profileUrl
      }
    })
  } catch (error) {
    console.error('Error registering food partner:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

// Login a food partner

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingFoodPartner = await foodPartnerModel.findOne({ email })
    if (!existingFoodPartner) {
      return res.status(400).json({
        message: 'Invalid email or password'
      })
    }

    const isValidPassword = await bcrypt.compare(password, existingFoodPartner.password)
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign({ id: existingFoodPartner._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
    res.cookie('token', token,{
      httpOnly: true,
      secure: 'true',
      sameSite: "none", // or "none" if using localhost + https together
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    res.status(200).json({
      message: 'Login successful',
      foodPartner: {
        _id: existingFoodPartner._id,
        name: existingFoodPartner.name,
        email: existingFoodPartner.email,
        shopName: existingFoodPartner.shopName,
        phone: existingFoodPartner.phone,
        profileUrl: existingFoodPartner.profileUrl
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

// Logout a food partner
const logoutFoodPartner = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    message: 'User logged out successfully'
  })
}

const FetchFoodPartner = async (req, res) => {
  const id = req.query.id


  if (!id) {
    return res.status(400).json({ message: 'Id not found' })
  }

  try {
    const FoodPartner = await foodPartnerModel.findById(id)

    if (!FoodPartner) {
      return res.status(404).json({ message: 'Food Partner not found' })
    }

    return res.status(200).json({
      message: 'Food Partner found successfully',
      FoodPartner: {
        name: FoodPartner.name,
        phone: FoodPartner.phone,
        shopName: FoodPartner.shopName,
        profileUrl: FoodPartner.profileUrl,
        follower: FoodPartner.follower,
        following: FoodPartner.following,
        type: FoodPartner.type,
      },
    })
  } catch (err) {
    console.error('Error fetching food partner:', err.message)
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    })
  }
}

module.exports = {
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  FetchFoodPartner
}
