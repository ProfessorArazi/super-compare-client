import axios from "axios";

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}/ap`,
    headers: {
        "Content-Type": "application/json",
    },
});
