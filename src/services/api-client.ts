import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URI
console.log(import.meta.env.VITE_BASE_URI);
const apiClient = axios.create({
    baseURL:BASEURL ,
})


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;