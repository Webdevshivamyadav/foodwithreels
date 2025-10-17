const moongose = require('mongoose');

try {
    moongose.connect("mongodb://localhost:27017/foodwithreels")
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}