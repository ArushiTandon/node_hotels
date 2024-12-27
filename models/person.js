const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },

    mobile: {
        type: String,
        require: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    address: {
        type: String,
    },

    salary: {
        type: Number,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;