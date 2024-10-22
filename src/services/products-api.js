import { apiClient } from "./api-client";

export const compareItems = (items) =>
    apiClient.post("/products/compare", items);

export const fetchProductsBySubject = async (subject, page, limit = 11) => {
    const outOfStock = localStorage.getItem("showOutOfStock");
    console.log(outOfStock);

    return await apiClient.get(
        `/products/${subject}?page=${page}&limit=${limit}&outOfStock=${
            outOfStock ? JSON.parse(outOfStock) : "true"
        }`
    );
};
