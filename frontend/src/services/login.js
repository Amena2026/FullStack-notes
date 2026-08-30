import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    console.log(response.data)
    return response.data
}

export default { login: login }