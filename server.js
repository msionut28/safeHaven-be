import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { userSchema } from './schemas/userSchema.js';
import { userRegister } from './ctrls/userCreate.js'
import { reviewSchema } from './schemas/reviewSchema.js';
import { addReview, getReview } from './ctrls/reviewFunctions.js';
import { authenticateChat, chatLogin } from './ctrls/chatEngine.js';
// import Reviews from './models/review.js'; 

//*APP SETUP
const app = express()
app.use(express.json());
const port = process.env.PORT || 4000
app.use(cors({ origin: true }));
app.use(bodyParser.json()) 
app.use(express.json())



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

//Endpoints for chat Engine .io

app.post("/authenticate", async (req, res) => {
    authenticateChat(req, res)
});

app.post("/login", async (req, res) => {
    chatLogin(req, res)
});

//*USER REGISTRATION

app.post("/register", async (req, res) => {
    userRegister(userAdded, req, res)
})