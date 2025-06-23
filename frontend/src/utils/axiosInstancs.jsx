import axios from "axios"

const axiosInstance = axios.create({
    // baseURL : "https://namma-services.onrender.com/api"
    baseURL : "http://127.0.0.1:3040/api"
})
export default axiosInstance