import axios from "axios";

const token = localStorage.getItem("token")

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common.Authorization = `Bearer ${token}`

export {instance};