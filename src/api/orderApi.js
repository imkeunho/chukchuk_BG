import {API_SERVER_HOST} from "./productApi";
import axios from "axios";

const host = `${API_SERVER_HOST}/api/orders`

export const putList = async (arr) => {

    const res = await axios.post(`${host}/`, arr)

    return res.data
}

export const getList = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data
}