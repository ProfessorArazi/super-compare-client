import CartItems from "../../components/Cart/CartItems/CartItems";
import CartActions from "../../components/Cart/CartActions/CartActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Cart.module.css";
import { useState } from "react";
import { compareItems } from "../../services/products-api";
import Result from "../Result/Result";

const Cart = ({
    items,
    onRemove,
    onRemoveTotal,
    onAdd,
    setProductData,
    showCarousel,
    setShowCarousel,
}) => {
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const hasItems = items?.length > 0;

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
                    <div className="loading">
                        <LoadingSpinner />
                    </div>
                ) : showCarousel ? (
                    <Result prices={Object.entries(prices)} />
                ) : (
                    <>
                        <CartItems
                            items={items}
                            onRemove={onRemove}
                            onRemoveTotal={onRemoveTotal}
                            onAdd={onAdd}
                            setProductData={setProductData}
                        />
                        <CartActions
                            hasItems={hasItems}
                            onCompare={() => compare(items)}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
