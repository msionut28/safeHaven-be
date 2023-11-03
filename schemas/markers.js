import mongoose from 'mongoose';

 export const markerSchema = new mongoose.Schema({
    position: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    text: {
      type: String,
      default: ''
    },
  });

  

 

