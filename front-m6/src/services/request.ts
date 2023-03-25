import axios from "axios";

export const token = localStorage.getItem("@TOKEN");

export const api = axios.create({
    baseURL: "https://fullstack-api-ncj2.onrender.com",
    
    headers: {
        Authorization: `Bearer ${token}`,
    },
});