import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = 'http://localhost:8080'

const adminHost = `${API_SERVER_HOST}/api/products/admin`

const userHost = `${API_SERVER_HOST}/api/products/user`

export const getList = async (pageParam) => {

    const {page, size} = pageParam

    const res = await axios.get(`${userHost}/list`, {params: {page: page, size: size}})

    return res.data
}

export const submit = async (form) => {

    const res = await axios.post(`${userHost}/submit`, form)

    return res.data
}

export const getOne = async (pno) => {

    console.log("pno : ")
    console.log(pno)

    const res = await axios.get(`${userHost}/${pno}`)

    return res.data
}

export const postAdd = async (product) => {

    const header = {headers : {'Content-Type' : 'multipart/form-data'}};

    const res = await jwtAxios.post(`${adminHost}`, product, header)

    return res.data
}

export const deleteOne = async (pno) => {

    const res = await jwtAxios.delete(`${adminHost}/${pno}`);

    return res.data;
}

export const putOne = async (pno, product) => {

    const header = {headers : {'Content-Type' : 'multipart/form-data'}};

    const res = await jwtAxios.put(`${adminHost}/${pno}`, product, header)

    return res.data;
}