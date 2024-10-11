import CartItems from "../../components/Cart/CartItems/CartItems";
import CartActions from "../../components/Cart/CartActions/CartActions";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CompareContext from "../../store/compare-context";
import { compareItems } from "../../services/products-api";
import Result from "../../components/Cart/Result/Result";

const Cart = ({ isOpen, setProductData }) => {
    const [showCarousel, setShowCarousel] = useState(false);
    const [prices, setPrices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const ctx = useContext(CompareContext);
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = (event, id) => {
        event.stopPropagation();
        ctx.removeItem(id);
    };

    const cartItemAddHandler = (event, item) => {
        event.stopPropagation();
        ctx.addItem({ ...item, amount: 1 });
    };

    const cartClearItemsHandler = () => {
        sessionStorage.removeItem("items");
        ctx.clearCart();
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
            <div
                className={`${classes.cart} ${
                    isOpen ? classes["cart-open"] : ""
                }`}
            >
                {isLoading ? (
                    <div className="loading">
                        <LoadingSpinner />
                    </div>
                ) : showCarousel ? (
                    <Result
                        prices={Object.entries(prices)}
                        onClose={() => setShowCarousel(false)}
                    />
                ) : (
                    <>
                        <CartItems
                            items={ctx.items}
                            onRemove={cartItemRemoveHandler}
                            onAdd={cartItemAddHandler}
                            setProductData={setProductData}
                        />
                        {!hasItems && (
                            <h5 className={classes.empty}>הוסף מוצרים לעגלה</h5>
                        )}
                        <CartActions
                            hasItems={hasItems}
                            onClear={cartClearItemsHandler}
                            onCompare={() => compare(ctx.items)}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
