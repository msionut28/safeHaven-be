import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    memberSince: String,
    profilepic: String
})