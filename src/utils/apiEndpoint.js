import { config } from '../environments'
import axios from "axios"

const ssoLoign = async (data) => {
    const endpoint = config.login
    
    return axios.post(endpoint,data).then(res => {
        return res
    }).catch(error => {
        return error.response
    });
}
const getTodos = async (token) => {
    const endpoint = config.todos
    const headers = { headers: {Authorization: `Bearer ${token}`}}

    return axios.get(endpoint, headers).then(res => {
        return res
    }).catch(error => {
        return error.response
    });
}
const addTodos = async (data,token) => {
    const endpoint = config.todos
    const headers = { headers: {Authorization: `Bearer ${token}`}}

    return axios.post(endpoint, data, headers).then(res => {
        return res
    }).catch(error => {
        return error.response
    });
}
const updateTodos = async (data,id,token) => {
    const endpoint = config.todos + `/${id}` 
    const headers = { headers: {Authorization: `Bearer ${token}`}}

    return axios.put(endpoint,data, headers).then(res => {
        return res
    }).catch(error => {
        return error.response
    });
}
const deleteTodos = async (id,token) => {
    const endpoint = config.todos + `/${id}` 
    const headers = { headers: {Authorization: `Bearer ${token}`}}

    return axios.delete(endpoint, headers).then(res => {
        return res
    }).catch(error => {
        return error.response
    });
}

export default {
    ssoLoign,
    getTodos,
    addTodos,
    updateTodos,
    deleteTodos
}