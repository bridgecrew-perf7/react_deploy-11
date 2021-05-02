import axios from 'axios';

// API 함수 정의
export const getPosts = async () => {
  const response = await axios.get('/posts');
  return response.data;
};

export const getPostById = async id => {
  const response = await axios.get(`/posts/${id}`);
  return response.data;
};

export const deletePost = async id => {
  const response = await axios.delete(`/posts/${id}`);
  return response.data;
}

export const addPost = async (data) => {
  const response = await axios.post(`posts`, data);
  return response.data;
}
