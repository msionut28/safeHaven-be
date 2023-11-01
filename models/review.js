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
    isUniversity: Boolean,
    support: Number,
    community: Number
});

const Reviews = mongoose.model("Review", reviewSchema);
// review post method
app.post("/AddReview", async (req, res) => {
    try {
        const data = req.body;
        const review = new Reviews({
            venue: data.venue,
            review: data.review,
            inclusivity: data.inclusivity,
            safety: data.safety,
            date: data.date,
            isUniversity: data.isUniversity,
            support: data.support,
            community: data.community
        });

        await review.save();  
        res.status(201).json({ message: "Review added great success" });

    } catch (err) {
        console.log("ERROR ruh roh zoinks scoob", err.message);
        res.status(500).json({ error: "Internal server blunder" });
    }
});

export default Reviews;