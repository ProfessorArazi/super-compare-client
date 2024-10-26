import React, { useState } from "react";
import CartProvider from "./store/Cart/CartProvider";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Layout/Header/Header";
import { Helmet } from "react-helmet";
import Home from "./pages/Home/Home";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";
import FavoritesProvider from "./store/Favorites/FavoritesProvider";
import { Banner } from "./components/UI/Banner/Banner";

function App() {
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showOutOfStock, setShowOutOfStock] = useState(() => {
        const storageOutOfStock = localStorage.getItem("showOutOfStock");
        return storageOutOfStock !== null
            ? JSON.parse(storageOutOfStock)
            : true;
    });

    const toggleClickHandler = (show) => {
        if (isLoading) return;
        window.scrollTo(0, 0);
        localStorage.setItem("showOutOfStock", show);
        setShowOutOfStock(show);
    };

    return (
        <>
            <Helmet>
                <title>Super Compare</title>
            </Helmet>
            <CartProvider>
                <FavoritesProvider>
                    <ProductDetails
                        isOpen={productData}
                        productData={productData}
                        onClose={() => setProductData(null)}
                    />
                    <Header
                        setProductData={setProductData}
                        showOutOfStock={showOutOfStock}
                        toggleClickHandler={toggleClickHandler}
                    >
                        <Banner />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home
                                        showOutOfStock={showOutOfStock}
                                        setProductData={setProductData}
                                    />
                                }
                            />
                            <Route
                                path="/products/:subject"
                                element={
                                    <Products
                                        setProductData={setProductData}
                                        showOutOfStock={showOutOfStock}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                    />
                                }
                            />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </Header>
                    {/* <Footer /> */}
                </FavoritesProvider>
            </CartProvider>
        </>
    );
}

export default App;
