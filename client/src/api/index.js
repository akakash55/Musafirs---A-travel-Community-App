import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


//It is like a middle-ware, basically it is added on any request (be it GET, POST, PUT, DELETE) or on any response (the response you get from the server). It is often used for cases where authorisation is involved.
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; // use the bearer token to get a new Access token. To get an access token i sent the Authentication server this bearer token along with the client id.
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//req.headers.Authorization contains the credential to authenticate a user with a server