import React, { useState } from "react";
import CartProvider from "./store/CartProvider";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Layout/Header/Header";
import { Helmet } from "react-helmet";
import Home from "./pages/Home/Home";
import ProductDetails from "./components/Products/ProductDetails/ProductDetails";
import { Wrapper } from "./components/UI/Wrapper/Wrapper";

function App() {
    const [productData, setProductData] = useState(null);

    const bannerStyle = {
        color: "#fff",
        background: "black",
        height: "500px",
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
                <Header setProductData={setProductData} />
                <Wrapper>
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
                </Wrapper>
                {/* <Footer /> */}
            </CartProvider>
        </>
    );
}

export default App;
