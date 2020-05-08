const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter a valid text"]
    },
    email: {
        type: String,
        required: [true, "enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "enter a valid password"]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)