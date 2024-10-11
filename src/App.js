import React from "react";
import Footer from "./components/Layout/Footer/Footer";
import CartProvider from "./store/CartProvider";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Layout/Header/Header";
import { Helmet } from "react-helmet";
import Home from "./pages/Home/Home";

function App() {
    return (
        <>
            <Helmet>
                <title>Super Compare</title>
            </Helmet>
            <CartProvider>
                <Header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/products/:subject"
                            element={<Products />}
                        />
                    </Routes>
                </Header>
                <Footer />
            </CartProvider>
        </>
    );
}

export default App;
