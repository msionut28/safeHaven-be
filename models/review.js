import mongoose from 'mongoose';
import express from 'express';
//*APP SETUP
const app = express()
app.use(express.json());

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
        console.log("ERROR ruh roh zoinks scoob", err.message);
        res.status(500).json({ error: "Internal server blunder" });
    }
});
export default Reviews;