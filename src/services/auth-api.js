import { apiClient } from "./api-client";

export const signup = (user) => apiClient.post("/auth/signup", user);

export const signin = (user) => apiClient.post("/auth/signin", user);
