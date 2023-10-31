import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { reviewSchema } from './schemas/reviewSchema.js'
import { addReview, getReview } from './ctrls/reviewFunctions.js';
import { authenticateChat, chatLogin } from './ctrls/chatEngine.js';
// import Reviews from './models/review.js'; 

//*APP SETUP
const app = express()
app.use(express.json());
const port = process.env.PORT || 4000
app.use(cors({ origin: true }));
app.use(express.json())
app.listen(port, () => { console.log(`Server listening on port: ${port}🚀 ` ); })


//*DATABASE CONNECTION AND SETTINGS 
const safeHaven = mongoose.connect(process.env.DATABASE_URL)

// Schemas for Review and other potential models 
const Reviews = mongoose.model("Review", reviewSchema);

//* Reviews Endpoints
app.post("/AddReview", async (req, res) => {
    addReview(req, res, Reviews)
});

app.get("/GetReviews", async (req, res) => {
    getReview(req, res, Reviews)
  })

//Endpoints for chat Engine .io

app.post("/authenticate", async (req, res) => {
    authenticateChat(req, res)
});

app.post("/login", async (req, res) => {
    chatLogin(req, res)
});

//*USER REGISTRATION
