import express from "express";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const {username, content} = req.body;
    
    //check if user exists
    console.log(username)
    console.log(content)
    const dbUser = await User.findOne({username});
    console.log(dbUser);
    if(dbUser) {
        const newTweet = await Tweet.create({content: content, user: dbUser._id, username: dbUser.username})
        return res.json(newTweet);
    } else {
        const newUser = await User.create({username})
        const newTweet = await Tweet.create({content: content, username: newUser._id, username: username})
        return res.json(newTweet);
    }
});

/**
 * Fetch all tweets
 * @method GET /tweets/
 * @description This route is used by the useEffect in TweetList.jsx
 */
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.send(tweets);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

/**
 * Deletes tweet by the id
 * @method Delete /tweets/:id
 * @param id
 * @description This route is used by the removeTweet in TweetList.jsx
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tweet.findOneAndDelete(id);
    res.json({ msg: `Tweet with id: ${id} was deleted!` });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

/**
 * Updates tweets by the id
 * @method PUT /tweets/:id
 * @param id
 * @description This route is used by the updateTweet in TweetList.jsx
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { newTweetContent } = req.body;
  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(
      id,
      { content: newTweetContent },
      { new: true },
    );

    console.log(updatedTweet);
    res.json(updatedTweet);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

export default router;

import express from "express";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";