import CartItems from "../../components/Cart/CartItems/CartItems";
import CartActions from "../../components/Cart/CartActions/CartActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Cart.module.css";
import { useState } from "react";
import { compareItems } from "../../services/products-api";
import Result from "../Result/Result";
import { useDispatch, useSelector } from "react-redux";
import {
    removeItem,
    removeTotalItem,
    addItem,
} from "../../store/Cart/cartSlice";

const Cart = ({ setProductData, showCarousel, setShowCarousel }) => {
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const items = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const hasItems = items?.length > 0;

    const cartItemRemoveHandler = (event, id) => {
        event.stopPropagation();
        dispatch(removeItem(id));
    };

    const cartItemRemoveTotalHandler = (event, id) => {
        event.stopPropagation();
        dispatch(removeTotalItem(id));
    };

    const cartItemAddHandler = (event, item) => {
        event.stopPropagation();
        dispatch(addItem({ ...item, amount: 1 }));
    };

    const compare = async (items) => {
        setIsLoading(true);
        try {
            const res = await compareItems(items);
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
                    <CartItems
                        items={items}
                        onRemove={cartItemRemoveHandler}
                        onRemoveTotal={cartItemRemoveTotalHandler}
                        onAdd={cartItemAddHandler}
                        setProductData={setProductData}
                    />
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
