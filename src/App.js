import Footer from "./components/Layout/Footer/Footer";
import CartProvider from "./store/CartProvider";
import { Route, Switch } from "react-router-dom";
import Products from "./pages/Products/Products";
import Header from "./components/Layout/Header/Header";
import { Helmet } from "react-helmet";
import ScrollToTop from "./utils/ScrollToTop ";
import Home from "./pages/Home/Home";

//

function App() {
    return (
        <>
            <Helmet>
                <title>Super Compare</title>
            </Helmet>
            <ScrollToTop>
                <CartProvider>
                    <Header>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/products/:subject">
                                <Products />
                            </Route>
                        </Switch>
                    </Header>
                    <Footer />
                </CartProvider>
            </ScrollToTop>
        </>
    );
}

export default App;
