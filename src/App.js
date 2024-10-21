import React, { useEffect, useState } from "react";
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
    const [showOutOfStock, setShowOutOfStock] = useState(() => {
        const storedValue = localStorage.getItem("showOutOfStock");
        return storedValue !== null ? JSON.parse(storedValue) : true;
    });

    useEffect(() => {
        localStorage.setItem("showOutOfStock", JSON.stringify(showOutOfStock));
    }, [showOutOfStock]);

    return (
        <>
            <Helmet>
                <title>Super Compare</title>
            </Helmet>
            <CartProvider>
                <FavoritesProvider>
                    {productData && (
                        <ProductDetails
                            productData={productData}
                            onClose={() => setProductData(null)}
                        />
                    )}
                    <Header
                        setProductData={setProductData}
                        showOutOfStock={showOutOfStock}
                        setShowOutOfStock={setShowOutOfStock}
                    >
                        <Banner />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/products/:subject"
                                element={
                                    <Products
                                        setProductData={setProductData}
                                        showOutOfStock={showOutOfStock}
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
