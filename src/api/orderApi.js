import {API_SERVER_HOST} from "./productApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/orders`

export const getList = async (params) => {

    const {dong, ho} = params

    const res = await jwtAxios.get(`${host}/list`, {params: {dong: dong, ho: ho}})

    return res.data
}

export const deleteOne = async (ono) => {

    const res = await jwtAxios.delete(`${host}/${ono}`)

    return res.data
}

export const putOnePayment = async (ono) => {

    const res = await jwtAxios.put(`${host}/payment/${ono}`)

    return res.data
}

export const putOneComplete = async (ono) => {

    const res = await jwtAxios.put(`${host}/complete/${ono}`)

    return res.data
}

export const putFreezing = async () => {

    const res = await jwtAxios.put(`${host}/complete/all`)

    return res.data
}

export const getItem = async (dong) => {

    const res = await jwtAxios.get(`${host}/item/${dong}`)

    return res.data
}