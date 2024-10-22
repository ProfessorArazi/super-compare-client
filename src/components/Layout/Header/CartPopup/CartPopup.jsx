import Cart from "../../../../pages/Cart/Cart";
import TrashIcon from "../../../../assets/TrashIcon";
import SaveIcon from "../../../../assets/SaveIcon";
import ArrowLeftIcon from "../../../../assets/ArrowLeftIcon";
import classes from "./CartPopup.module.css";

const CartPopup = ({
    showCarousel,
    setShowCarousel,
    backToCartHandler,
    setProductData,
    ctx,
}) => {
    const cartClearItemsHandler = () => {
        sessionStorage.removeItem("items");
        ctx.clearCart();
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
                        onClick={() => console.log(ctx.items)}
                        className={classes["side-title-action"]}
                    >
                        <SaveIcon /> שמירת סל
                    </div>
                </div>
            </div>
            <Cart
                ctx={ctx}
                setProductData={setProductData}
                setShowCarousel={setShowCarousel}
                showCarousel={showCarousel}
            />
        </div>
    );
};

export default CartPopup;
