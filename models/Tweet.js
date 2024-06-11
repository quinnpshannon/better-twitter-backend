import mongoose, { mongo } from "mongoose";
import {commentSchema} from "./Comment.js";
// import User from "./User.js";

const tweetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema],
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    retweets: {
        type: Number,
        default: 0
    },
},{timestamps: true});

export default mongoose.model('Tweet', tweetSchema);