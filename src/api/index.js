import axios from 'api/network';

const URL = 'http://localhost:3013/posts';

export const getPosts = () => axios.get(URL);

export const getPostId = id =>
  axios.get(`${URL}/${id}`);

export const createPost = (data) => axios.post(URL, { ...data });

export const updateBookedStatus = (id, booked) =>
  axios.patch(`${URL}/${id}`, { booked: booked })

export const removePost = id =>
  axios.delete(`${URL}/${id}`);