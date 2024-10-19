import React, { useState } from "react";
import CartProvider from "./store/CartProvider";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Layout/Header/Header";
import { Helmet } from "react-helmet";
import Home from "./pages/Home/Home";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";

function App() {
    const [productData, setProductData] = useState(null);

    const bannerStyle = {
        color: "#fff",
        background: "#1c1c20",
        marginTop: "18dvh",
        height: "20dvh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

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
                    <div style={bannerStyle}>
                        <h1>Banner</h1>
                    </div>
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
                {/* <Footer /> */}
            </CartProvider>
        </>
    );
}

export default App;
