import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/products`

export const getList = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data
}

export const putList = async (arr) => {

    const res = await axios.post(`${host}/`, arr)

    return res.data
}