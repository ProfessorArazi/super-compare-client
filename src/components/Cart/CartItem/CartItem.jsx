import classes from "./CartItem.module.css";
import PlusIcon from "../../../assets/PlusIcon";
import MinusIcon from "../../../assets/MinusIcon";
import useImageFallback from "../../../hooks/useImageFallback";

const CartItem = (props) => {
    const [currentImage, handleImageError] = useImageFallback(props.images);

    const setProduct = (product) => {
        props.setProductData({ ...product });
    };

    return (
        <li className={classes.item}>
            <div className={classes["cart-item"]}>
                <img
                    onClick={() => setProduct(props)}
                    className={classes.img}
                    src={currentImage}
                    alt={props.name}
                    onError={handleImageError}
                />
                <div>
                    <p className={classes.name}>{props.name}</p>
                    <div className={classes.actions}>
                        <p
                            className={classes.btn}
                            onClick={(e) => props.onAdd(e)}
                        >
                            <PlusIcon />
                        </p>
                        <p>{props.amount}</p>
                        <p
                            className={classes.btn}
                            onClick={(e) => props.onRemove(e)}
                        >
                            <MinusIcon />
                        </p>
                        <p>יח'</p>
                    </div>
                </div>
                <div
                    onClick={(e) => props.onRemoveTotal(e)}
                    className={classes.delete}
                >
                    <p>הסרה</p>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
