require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Custom imports
const connectDB = require('./db/dbconnection.js')
const userRouter = require('./Routes/user.route.js')
const foodPartnerRouter = require('./Routes/foodPartner.route.js')
const foodItemRouter = require('./Routes/foodItem.route.js')

const app = express()

// Connect MongoDB (only once)
connectDB()

// Middlewares
app.use(cookieParser())
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: true }))

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true
  })
)

// Routes
app.use('/api/users', userRouter)
app.use('/api/foodPartners', foodPartnerRouter)
app.use('/api/foodItem', foodItemRouter)

// Default route
app.get('/', (req, res) => {
  res.send('Server is running 🚀')
})

// Export app for server.js
module.exports = app
