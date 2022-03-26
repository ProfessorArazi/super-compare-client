import { useEffect } from "react";
import Footer from "./Components/Layout/Footer";
import CartProvider from "./store/CartProvider";
import { Route, Switch } from "react-router-dom";
import Products from "./Components/Products/Products";
import Header from "./Components/Layout/Header";
import { Helmet } from "react-helmet";
import ScrollToTop from "./helpers/ScrollToTop ";
import Home from "./Components/Home/Home";
import axios from "axios";

/*
todo:
1.home page
2.search bar
3.modal in media
*/

function App() {
  useEffect(() => {
    axios(process.env.REACT_APP_SERVER);
  }, []);

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
              <Route path="/products/:product">
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
