import axios, { AxiosInstance } from "axios"

export const api:AxiosInstance = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});