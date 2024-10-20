import { apiClient } from "./api-client";

export const getFavorites = () => apiClient.get("/favorites");

export const addFavorite = (favorite) =>
    apiClient.post("/favorites/save", favorite);

export const editFavorite = (favorite) =>
    apiClient.post("/favorites/edit", favorite);
