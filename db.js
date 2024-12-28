const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;
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