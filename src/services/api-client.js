import axios from "axios";

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});
