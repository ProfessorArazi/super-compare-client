import React, { useState } from "react";
import Footer from "./components/Layout/Footer/Footer";
import CartProvider from "./store/CartProvider";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Layout/Header/Header";
import { Helmet } from "react-helmet";
import Home from "./pages/Home/Home";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";

function App() {
    const [productData, setProductData] = useState(null);

    return (
        <>
            <Helmet>
                <title>Super Compare</title>
            </Helmet>
            <CartProvider>
                {productData && (
                    <ProductDetails
                        productData={productData}
                        onClose={() => setProductData(null)}
                    />
                )}
                <Header setProductData={setProductData}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/products/:subject"
                            element={
                                <Products setProductData={setProductData} />
                            }
                        />
                    </Routes>
                </Header>
                <Footer />
            </CartProvider>
        </>
    );
}

export default App;
