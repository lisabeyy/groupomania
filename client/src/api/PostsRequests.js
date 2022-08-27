import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=> API.put(`posts/${id}/like`, {userId: userId})
export const deletePost=(id, userId)=> API.delete(`posts/${id}`,  { data: { userId: userId }})