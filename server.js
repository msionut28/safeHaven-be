import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

//*APP SETUP
const app = express()
const port = process.env.PORT || 4000
app.use(cors())
app.use(bodyParser.json())
app.listen(port, () => { console.log(`Server listening on port: ${port}`); })

//*DATABASE CONNECTION AND SETTINGS 
const safeHaven = mongoose.connect(process.env.DATABASE_URL)