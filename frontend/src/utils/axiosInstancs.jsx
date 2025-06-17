import axios from "axios"

const axiosInstance = axios.create({
    baseURL : "https://namma-services.onrender.com/api"
})
export default axiosInstance