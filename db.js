require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL_LOCAL;

if (!mongoURL) {
    console.error('MongoDB URI is not defined. Please set the MONGODB_URI environment variable.');
    process.exit(1); 
}

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