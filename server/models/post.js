import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    places: String,
    when: String,
    persons: Number,
    name: String,
    creator: String,
    instaId: String,
    email: String,
    message: String,
    color:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostModal = mongoose.model('PostModal', postSchema);

export default PostModal;