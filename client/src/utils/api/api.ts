import axios, { AxiosRequestConfig } from "axios";
import { User, RegisterType, LoginType } from "../types";

const API_URL = "http://localhost:4000/api/";
const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };
export const postRegisterUser = (data: RegisterType) =>
  axiosClient.post(`/auth/register`, data, config);
export const postLoginUser = (data: LoginType) =>
  axiosClient.post(`/auth/login`, data, config);
export const getAuthUser = () => axiosClient.get<User>(`/auth`, config);
