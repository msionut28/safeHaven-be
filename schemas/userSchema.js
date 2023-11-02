import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    memberSince: String,
    profilePic: {type: String, default: ""},
    aboutYourself: {type: String, default: ""},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
})