const express = require('express');
const app = express();
const mongoose = require('./db/dbconnection.js');
const userRouter = require('./Routes/user.route.js');
const foodPartnerRouter = require('./Routes/foodPartner.route.js');
const foodItemRouter = require('./Routes/foodItem.route.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST",'DELETE','PUT','PATCH'],
    credentials:true,
}));
app.use(express.json({ limit: '500mb' }));

app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use('/api/users', userRouter);
app.use('/api/foodPartners', foodPartnerRouter);
app.use('/api/foodItem',foodItemRouter)

app.get('/', (req, res) => {

  res.send('Hello World!');
}
);

module.exports = app;