import axios from "axios";

const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/products`

export const getList = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data
}