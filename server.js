import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Reviews from './models/review.js';
//*APP SETUP
const app = express()
app.use(express.json());
const port = process.env.PORT || 4000
app.use(cors({ origin: true }));
app.use(express.json())
app.listen(port, () => { console.log(`Server listening on port: ${port}`); })

//chat engine details

const CHAT_ENGINE_PROJECT_ID = "4c61fca9-e537-418a-a97c-5759ecafb802";
const CHAT_ENGINE_PRIVATE_KEY = "1e73c74e-6025-4dd8-a0ac-6fe0ef38495d";

//*DATABASE CONNECTION AND SETTINGS 
const safeHaven = mongoose.connect(process.env.DATABASE_URL)

// Schemas for Review and other potential models 

const reviewSchema = new mongoose.Schema({
    venue: String,
    review: String,
    inclusivity: Number,
    safety: Number,
    date: Date,
    user: String,
  });

  const Reviews = mongoose.model("Review", reviewSchema);

// review post method

app.post("/AddReview", async (req, res) => {
    const email = req.body.email;
    try {
      const data = req.body;
        
      const review = new Reviews({
        
        venue: data.venue,
        review: data.review,
        inclusivity: data.inclusivity,
        safety: data.safety,
        date: data.date,
      });
    } catch (err) {
        console.log("ERROR MESSAGE HERE ->", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


//Endpoints for chat Engine .io

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
        const response = await fetch('https://api.chatengine.io/users/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'PRIVATE-KEY': CHAT_ENGINE_PRIVATE_KEY
            },
            body: JSON.stringify({
                username: username,
                secret: username,
                first_name: username
            })
        });
        
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (e) {
        return res.status(e.status || 500).json(e);
    }
});

app.post("/login", async (req, res) => {
    const { username, secret } = req.body;

    try {
        const response = await fetch("https://api.chatengine.io/users/me/", {
            method: 'GET',
            headers: {
                "Project-ID": CHAT_ENGINE_PROJECT_ID,
                "User-Name": username,
                "User-Secret": secret,
            }
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (e) {
        return res.status(e.status || 500).json(e);
    }
});

// Fetch reviews for a specific venue
app.get("/GetReviews", async (req, res) => {
    const { venue } = req.query;
    try {
      const reviews = await Reviews.find({ venue });
      res.status(200).json(reviews);
    } catch (err) {
      console.log("error", err.message);
      res.status(500).json({ error: "Internal error" });
    }
  });
