import axios from "axios";
import { HOST } from "@/utils/constants";

export const apiClient = axios.create({
    baseURL: HOST,
    // headers:{
    //     'Content-Type': 'application/json'
    // },
    withCredentials: true,
});