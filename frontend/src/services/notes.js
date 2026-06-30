import axios from "axios";
const baseUrl = 'http://localhost:3001/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    return axios.get(baseUrl)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token}
    }

    const response = await axios.post(baseUrl, newObject, config)
    console.log(response.data)
    return response.data
}

const remove = id => {
    const config = {
        headers: { Authorization: token}
    }

    return axios.delete(`${baseUrl}/${id}`, config)
}

export default { 
  getAll: getAll, 
  create: create, 
  remove: remove,
  setToken: setToken
}