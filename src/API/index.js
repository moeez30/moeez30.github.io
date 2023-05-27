import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? "https://moeapp-30.herokuapp.com" : "https://moeapp-30.herokuapp.com";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;