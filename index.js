import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import tweetsRouter from './routes/tweets.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.ATLAS_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/tweets',tweetsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!')
})

app.post('/', async (req, res) => {
    let pressureData = await req.body
    console.log(await pressureData)
    res.send('Welcome to the API!')
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))