import { apiClient } from "./api-client";

export const compareItems = (cartId) =>
    apiClient.get(`/cart/${cartId}/compare`);

export const getCart = (cartId) => apiClient.get(`/cart/${cartId}`);

export const manageCart = (cartId, action, item) =>
    apiClient.post(`/cart/${cartId ? cartId : ""}`, { action, item });
