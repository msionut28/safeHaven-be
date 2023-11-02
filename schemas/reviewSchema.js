import mongoose from 'mongoose'

export const reviewSchema = new mongoose.Schema({
  venue: String,
  review: String,
  inclusivity: Number,
  safety: Number,
  date: Date,
  user: String,
  isUniversity: Boolean,
  support: Number,
  community: Number
  });