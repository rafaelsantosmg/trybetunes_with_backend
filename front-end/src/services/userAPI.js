import axios from 'axios';

const USER_KEY = 'user';

export const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
export const saveUser = (user, token) => localStorage
  .setItem(USER_KEY, JSON.stringify({ user, token }));

const localURL = 'http://localhost:3333';

const reservationAPI = axios.create({
  baseURL: localURL,
});

export default reservationAPI;
