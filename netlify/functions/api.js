import bodyParser from 'body-parser';
import cors from 'cors';
import express, {Router} from 'express';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import 'dotenv/config';
import { individualUser } from './ctrls/individualUser.js';
import { userSchema } from './schemas/userSchema.js';
import { userRegister } from './ctrls/userCreate.js'
import { reviewSchema } from './schemas/reviewSchema.js';
import { addReview, getReview } from './ctrls/reviewFunctions.js';
import { authenticateChat, chatLogin } from './ctrls/chatEngine.js';
import { loginFunction } from './ctrls/userLogin.js';
import { addMarker } from './ctrls/markerFunction.js';
import { markerSchema } from './schemas/markers.js';
import { deleteMarker } from './ctrls/markerFunction.js';
import { getMarker } from './ctrls/markerFunction.js';

const api = express()
api.use(cors({ origin: true }))
api.use(bodyParser.json())

//*MONGODB CONNECTION
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
   console.log('CONNECTED TO THE DATABASE 🖥');
   router.listen(port, () => { console.log(`Server listening on port: ${port} 🚀 ` ); })
})

//*MODELS 
const Reviews = mongoose.model("Review", reviewSchema)
const userAdded = mongoose.model("User", userSchema)
const Marker = mongoose.model('Marker', markerSchema)

const router = Router()

//* Reviews Endpoints
router.post("/AddReview", async (req, res) => {
    addReview(req, res, Reviews)
});

router.get("/GetReviews", async (req, res) => {
    getReview(req, res, Reviews)
  })

router.delete("/DeleteReview/:id", async (req, res) => {
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

router.post("/authenticate", async (req, res) => {
    authenticateChat(req,res)
});

router.post("/login", async (req, res) => {
    chatLogin(req, res)
});

//*USER REGISTRATION

router.post("/register", async (req, res) => {
    userRegister(userAdded, req, res)
})

router.post("/login/credential", async(req, res) => {
    loginFunction(req, res, userAdded)
})

router.get("/user/:id", async (req, res) => {
    individualUser(userAdded, req, res)
})

//Map Markers Endpoints
router.post("/markers", async (req, res) => {
    addMarker(Marker,req, res)
})
router.get("/markers", async (req, res) => {
    getMarker(Marker, req, res)
})

router.delete("/markers/:id", async (req,res) =>{
    deleteMarker(Marker, req, res)
})

api.use('/', router)

export const handler = serverless(api)