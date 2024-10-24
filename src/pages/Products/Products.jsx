import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import ProductList from "../../components/Products/ProductList/ProductList";
import { fetchProductsBySubject } from "../../services/products-api";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Products.module.css";

const Products = ({
    setProductData,
    showOutOfStock,
    isLoading,
    setIsLoading,
}) => {
    const { subject } = useParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const prevPage = useRef(page);
    const lastProductRef = useRef(null);

    const fetchProducts = useCallback(async (subject, page) => {
        try {
            const response = await fetchProductsBySubject(subject, page);

            if (response.data.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...response.data,
                ]);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }, []);

    const firstFetch = useCallback(async () => {
        setProducts([]);
        setPage(1);
        setHasMore(true);

        setIsLoading(true);
        await fetchProducts(subject, 1);
        setIsLoading(false);
    }, [fetchProducts, subject, setIsLoading]);

    useEffect(() => {
        firstFetch();
    }, [showOutOfStock, firstFetch]);

    useEffect(() => {
        if (prevPage.current !== page && page > 1) {
            fetchProducts(subject, page);
        }

        prevPage.current = page;
    }, [page, subject, fetchProducts]);

    const handleIntersection = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        },
        [hasMore]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        });

        const currentLastProduct = lastProductRef.current;
        if (currentLastProduct) {
            observer.observe(currentLastProduct);
        }

        return () => {
            if (currentLastProduct) {
                observer.unobserve(currentLastProduct);
            }
        };
    }, [handleIntersection, products]);

    return (
        <div className={classes.products}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <ProductList
                    products={products}
                    onProductClick={setProductData}
                    lastProductRef={lastProductRef}
                />
            )}
        </div>
    );
};

export default Products;
