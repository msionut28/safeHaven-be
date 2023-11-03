import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { individualUser } from './ctrls/individualUser.js';
import { userSchema } from './schemas/userSchema.js';
import { userRegister } from './ctrls/userCreate.js'
import { reviewSchema } from './schemas/reviewSchema.js';
import { addReview, getReview } from './ctrls/reviewFunctions.js';
import { authenticateChat, chatLogin } from './ctrls/chatEngine.js';
import { loginFunction } from './ctrls/userLogin.js';
// import Reviews from './models/review.js'; 

//*APP SETUP
const app = express()
app.use(express.json());
const port = process.env.PORT || 4000
app.use(cors({ origin: true }));
// app.use(bodyParser.json()) 
app.use(express.json())

const CHAT_ENGINE_PRIVATE_KEY= "1e73c74e-6025-4dd8-a0ac-6fe0ef38495d"
const CHAT_ENGINE_PROJECT_ID= "4c61fca9-e537-418a-a97c-5759ecafb802"



//*DATABASE CONNECTION AND SETTINGS 
 mongoose.connect(process.env.DATABASE_URL)
 .then(() => {
    console.log('CONNECTED TO THE DATABASE 🖥');
    app.listen(port, () => { console.log(`Server listening on port: ${port} 🚀 ` ); })
 })

//* MODELS
const Reviews = mongoose.model("Review", reviewSchema)
const userAdded = mongoose.model("User", userSchema)

//* Reviews Endpoints
app.post("/AddReview", async (req, res) => {
    addReview(req, res, Reviews)
});

app.get("/GetReviews", async (req, res) => {
    getReview(req, res, Reviews)
  })

app.delete("/DeleteReview/:id", async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id; 

    try {
        const review = await Reviews.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Failed to delete review:', error);
        res.status(500).json({ message: 'Failed to delete review' });
    }
});

//Endpoints for chat Engine .io

app.post("/authenticate", async (req, res) => {
    authenticateChat(req,res)
});

app.post("/login", async (req, res) => {
    chatLogin(req, res)
});

//*USER REGISTRATION

app.post("/register", async (req, res) => {
    userRegister(userAdded, req, res)
})

app.post("/login/credential", async(req, res) => {
    loginFunction(req, res, userAdded)
})

app.get("/user/:id", async (req, res) => {
    individualUser(userAdded, req, res)
})