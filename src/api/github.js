import axios from 'axios';

export async function getUserProfile(username) {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
}

export async function getGithubProfileList() {
  const response = await axios.get('/profile');
  return response.data;
}
export async function addGithubProfile(data) {
  const response = await axios.post(`profile`, data);
  return response.data;
}
export async function deleteGithubProfile(id) {
  const response = await axios.delete(`/profile/${id}`);
  return response.data;
}