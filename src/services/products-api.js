import { apiClient } from "./api-client";

export const fetchProductsBySubject = async (subject, page, limit = 11) => {
    const outOfStock = localStorage.getItem("showOutOfStock");

    return apiClient.get(
        `/products/${subject}?page=${page}&limit=${limit}&outOfStock=${
            outOfStock ? JSON.parse(outOfStock) : "true"
        }`
    );
};

export const getHomePageContent = async () => {
    const outOfStock = localStorage.getItem("showOutOfStock");

    return apiClient.get(
        `/special/products/?outOfStock=${
            outOfStock ? JSON.parse(outOfStock) : "true"
        }`
    );
};
