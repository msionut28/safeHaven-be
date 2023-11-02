import mongoose from 'mongoose';
import express from 'express';
//*APP SETUP
const app = express()
app.use(express.json());


const markerSchema = new Schema({
    position: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    text: {
      type: String,
      default: ''
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  const Marker = mongoose.model('Marker', markerSchema);

  app.post('/markers', async (req, res) => {
    try {
      const { position, text, userId } = req.body;
      const newMarker = new Marker({ 
        position,
        text,
        userId 
      });
      await newMarker.save();
      res.status(201).json(newMarker);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

