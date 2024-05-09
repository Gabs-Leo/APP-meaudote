import axios, { AxiosInstance } from "axios"

export const api:AxiosInstance = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});
export const locationApi:AxiosInstance = axios.create({baseURL: process.env.REACT_APP_REGION_API_URL});