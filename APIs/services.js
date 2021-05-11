import { LOGIN,REGISTER } from "../Const/constApi"
import axios from 'axios'

const baseUrl =   "http://192.168.0.137"

export function login(data) {
    return axios.post(baseUrl + LOGIN,data)
}


export function register(data) {
    return axios.post(baseUrl + REGISTER,data)
}
  
  