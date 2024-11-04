import Cart from "../../../../pages/Cart/Cart";
import TrashIcon from "../../../../assets/TrashIcon";
import SaveIcon from "../../../../assets/SaveIcon";
import ArrowLeftIcon from "../../../../assets/ArrowLeftIcon";
import classes from "./CartPopup.module.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../store/Cart/cartSlice";

const CartPopup = ({
    showCarousel,
    setShowCarousel,
    backToCartHandler,
    setProductData,
    isLoggedIn,
    setShowLogin,
}) => {
    const dispatch = useDispatch();

    const cartClearItemsHandler = () => {
        sessionStorage.removeItem("items");
        dispatch(clearCart());
    };

    const saveCartHandler = () => {
        if (!isLoggedIn) {
            setShowLogin(true);
        } else {
        }
    };

    return (
        <div className={classes["side-popup"]}>
            <div className={classes["side-title"]}>
                <h3>הסל שלי</h3>
                <div className={classes["side-title-actions"]}>
                    {showCarousel ? (
                        <div
                            onClick={backToCartHandler}
                            className={classes["side-title-action"]}
                        >
                            <ArrowLeftIcon />
                            חזרה לסל
                        </div>
                    ) : (
                        <div
                            onClick={cartClearItemsHandler}
                            className={classes["side-title-action"]}
                        >
                            <TrashIcon />
                            ניקוי סל
                        </div>
                    )}
                    <div
                        onClick={saveCartHandler}
                        className={classes["side-title-action"]}
                    >
                        <SaveIcon /> שמירת סל
                    </div>
                </div>
            </div>
            <Cart
                setProductData={setProductData}
                setShowCarousel={setShowCarousel}
                showCarousel={showCarousel}
            />
        </div>
    );
};

export default CartPopup;
