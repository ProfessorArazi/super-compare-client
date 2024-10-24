import CartItems from "../../components/Cart/CartItems/CartItems";
import CartActions from "../../components/Cart/CartActions/CartActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Cart.module.css";
import { useState } from "react";
import { compareItems } from "../../services/products-api";
import Result from "../Result/Result";

const Cart = ({ setProductData, showCarousel, setShowCarousel, ctx }) => {
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const hasItems = ctx.items?.length > 0;

    const cartItemRemoveHandler = (event, id) => {
        event.stopPropagation();
        ctx.removeItem(id);
    };

    const cartItemRemoveTotalHandler = (event, id) => {
        event.stopPropagation();
        ctx.removeTotalItem(id);
    };

    const cartItemAddHandler = (event, item) => {
        event.stopPropagation();
        ctx.addItem({ ...item, amount: 1 });
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
        <>
            <div className={classes.cart}>
                {isLoading ? (
                    <LoadingSpinner />
                ) : showCarousel ? (
                    <Result prices={Object.entries(prices)} />
                ) : (
                    <>
                        <CartItems
                            items={ctx.items}
                            onRemove={cartItemRemoveHandler}
                            onRemoveTotal={cartItemRemoveTotalHandler}
                            onAdd={cartItemAddHandler}
                            setProductData={setProductData}
                        />
                        <CartActions
                            hasItems={hasItems}
                            onCompare={() => compare(ctx.items)}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
