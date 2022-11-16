import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL // or process.env.BASE_URL if not using CRA
});

export default Api