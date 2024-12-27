const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels'
mongoose
.connect(mongoURL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Conncetion err:", err));

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected');
})

db.on('err', (err) => {
    console.log('error:', err);
})

db.on('disconnected', () => {
    console.log('disconnected');
})

module.exports = db;