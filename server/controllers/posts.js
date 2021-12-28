import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/post.js';

const router = express.Router();


//http://localhost:5000/posts fetches all the posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//http://localhost:5000/posts create a post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() }) // req.userId->middleware se aa raha hai
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//http://localhost:5000/posts/:id update a post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const {  places, when, persons, creator, instaId, email, message } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { places, when, persons, creator, instaId, email, message, _id: id  };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}


//http://localhost:5000/posts/:id delete a post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

export default router;