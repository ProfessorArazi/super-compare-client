import { apiClient } from "./api-client";

export const compareItems = (items) =>
    apiClient.post("/products/compare", items);

export const fetchProductsBySubject = (subject, page, limit = 15) =>
    apiClient.get(`/products/${subject}?page=${page}&limit=${limit}`);
