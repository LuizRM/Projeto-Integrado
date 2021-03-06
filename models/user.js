const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre('save', async function(next) {
    const salt = bcrypt.genSaltSync();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;