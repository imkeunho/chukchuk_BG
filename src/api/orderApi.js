import {API_SERVER_HOST} from "./productApi";
import axios from "axios";

const host = `${API_SERVER_HOST}/api/orders`

export const putList = async (arr) => {

    const res = await axios.post(`${host}/`, arr)

    return res.data
}

export const getList = async (params) => {

    const {dong, ho} = params

    const res = await axios.get(`${host}/list`, {params: {dong: dong, ho: ho}})

    return res.data
}

export const deleteOne = async (ono) => {

    const res = await axios.delete(`${host}/${ono}`)

    return res.data
}

export const putOne = async (ono) => {

    const res = await axios.put(`${host}/${ono}`)

    return res.data
}

export const getItem = async (dong) => {

    const res = await axios.get(`${host}/item/${dong}`)

    return res.data
}