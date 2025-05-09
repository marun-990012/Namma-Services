import axios from "axios"
const axiosInstance = axios.create({
    baseURL : "http://localhost:3040/api"
})
export default axiosInstance