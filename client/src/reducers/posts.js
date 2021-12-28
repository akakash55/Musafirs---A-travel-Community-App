import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

const postReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL: // fetches all the post
            return action.payload;
        case CREATE: // create a new post
            return [...posts, action.payload];
        case UPDATE: // updates an existing post
            return posts.map((individualPost) => (individualPost._id === action.payload._id ? action.payload : individualPost)); // agar post ka id aur payload ka id match karta hai toh payload ko return kar rahe hain nahi toh post ko
        case DELETE: // delete an existing post
            return posts.filter((post) => post._id !== action.payload); // action.payload.id isliye nahi likhe kyunki action se id hi pass kiya gaya hai
        default:
            return posts;
    }
};

export default postReducer;
