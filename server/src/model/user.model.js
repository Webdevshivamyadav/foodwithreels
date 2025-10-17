const moongose = require('mongoose')

const userSchema = new moongose.Schema(
  {
    name: {
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
    profileUrl: {
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
    type: {
      type: String,
      default: 'user'
    }
  },
  { timestamps: true }
)

const User = moongose.model('User', userSchema)
module.exports = User
