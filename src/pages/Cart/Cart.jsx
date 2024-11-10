import CartItems from "../../components/Cart/CartItems/CartItems";
import CartActions from "../../components/Cart/CartActions/CartActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Cart.module.css";
import { useState } from "react";
import Result from "../Result/Result";
import { useSelector } from "react-redux";
import { compareItems } from "../../services/cart-api";

const Cart = ({ setProductData, showCarousel, setShowCarousel }) => {
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const items = useSelector((state) => state.cart.items);

    const hasItems = items?.length > 0;

    const compare = async (items) => {
        setIsLoading(true);
        try {
            const res = await compareItems(localStorage.getItem("cartId"));
            setPrices(res.data);
            setShowCarousel(true);
        } catch (err) {
            console.error("Error comparing items", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classes.cart}>
            {isLoading && <LoadingSpinner />}
            {showCarousel ? (
                <Result prices={Object.entries(prices)} />
            ) : (
                <>
                    <CartItems items={items} setProductData={setProductData} />
                    <CartActions
                        hasItems={hasItems}
                        onCompare={() => compare(items)}
                    />
                </>
            )}
        </div>
    );
};

export default Cart;
