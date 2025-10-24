const jwt = require('jsonwebtoken')
const foodPartnerModel = require('../model/foodPartner.model')
const User = require('../model/user.model')

// ========================== Auth for Food Partner ==========================

const authFoodPartner = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access. Please log in.' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //Check if food partner exists

    const foodPartner = await foodPartnerModel.findById(decoded.id)
    if (!foodPartner) {
      return res.status(404).json({ message: 'Food partner not found.' })
    }

    req.foodPartner = foodPartner
    next()
  } catch (err) {
    console.error('Auth (FoodPartner) Error:', err.message)

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' })
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token. Please log in again.' })
    }

    return res.status(500).json({ message: 'Authentication failed.' })
  }
}

// ========================== Auth for Normal User ==========================

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access. Please log in.' })
    }

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if user exists
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    req.user = user
    next()
  } catch (err) {
    console.error('Auth (User) Error:', err.message)

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' })
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token. Please log in again.' })
    }

    return res.status(500).json({ message: 'Authentication failed.' })
  }
}

module.exports = {
  authFoodPartner,
  authUser
}
