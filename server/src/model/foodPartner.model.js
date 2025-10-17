const moongose = require('mongoose')
const userModel = require('./user.model')

const foodPartnerSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    shopName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    follower: {
      type: Number,
      required: true,
      default: 0
    },
    following: {
      type: Number,
      required: true,
      default: 0
    },
    profileUrl: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'foodPartner'
    }
  },
  { timestamps: true }
)

const foodPartnerModel = moongose.model('FoodPartner', foodPartnerSchema)

module.exports = foodPartnerModel
