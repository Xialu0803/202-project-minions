import axios from "axios";

const api = axios.create({
  baseURL: 'https://minions-airport-202.herokuapp.com/'  // or process.env.BASE_URL if not using CRA
});

export default api