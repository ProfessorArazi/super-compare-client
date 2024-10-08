import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import ProductList from "../../components/Products/ProductList/ProductList";
import ProductDetails from "../../components/Products/ProductDetails/ProductDetails";

const Products = () => {
    const { subject } = useParams();
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const prevSubject = useRef(null);
    const prevPage = useRef(page);

    const fetchProducts = useCallback(async (subject, page) => {
        try {
            const response = await axios(
                `${process.env.REACT_APP_SERVER}/products/${subject}?page=${page}&limit=11`
            );

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

    const handleScroll = useCallback(() => {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (
                documentHeight > windowHeight &&
                scrollY + windowHeight >= documentHeight - 300
            ) {
                setPage((prev) => prev + 1);
            }
        }, 200);
    }, []);

    useEffect(() => {
        if (hasMore) {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, hasMore]);

    useEffect(() => {
        if (prevPage.current !== page && page > 1) {
            fetchProducts(subject, page);
        } else if (prevSubject.current !== subject) {
            setProducts([]);
            setPage(1);
            setHasMore(true);
            fetchProducts(subject, 1);
        }

        prevSubject.current = subject;
        prevPage.current = page;
    }, [page, subject, fetchProducts]);

    const showProductDetails = (productDetails) => {
        window.scrollTo({ top: 0 });
        setProductData(productDetails);
    };

    return (
        <>
            {productData && (
                <ProductDetails
                    productData={productData}
                    onClose={() => setProductData(null)}
                />
            )}
            <ProductList
                products={products}
                onProductClick={showProductDetails}
            />
        </>
    );
};

export default Products;
