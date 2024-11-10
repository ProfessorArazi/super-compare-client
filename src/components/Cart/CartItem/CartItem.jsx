import classes from "./CartItem.module.css";
import PlusIcon from "../../../assets/PlusIcon";
import MinusIcon from "../../../assets/MinusIcon";
import useImageFallback from "../../../hooks/useImageFallback";
import useDebouncedCartUpdate from "../../../hooks/useDebouncedCartUpdate";
import { useDispatch } from "react-redux";
import { clearCart, removeTotalItem } from "../../../store/Cart/cartSlice";
import { manageCart } from "../../../services/cart-api";
import { filterNonSerializableProps } from "../../../utils/filterNonSerializableProps";

const CartItem = (props) => {
    const dispatch = useDispatch();

    const [currentImage, handleImageError] = useImageFallback(props.images);
    const debouncedCartUpdate = useDebouncedCartUpdate(
        filterNonSerializableProps(props)
    );

    const setProduct = (product) => {
        props.setProductData({ ...product });
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        debouncedCartUpdate(1);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        debouncedCartUpdate(-1);
    };

    const handleRemoveTotal = async (e) => {
        e.stopPropagation();
        dispatch(removeTotalItem(props.id));
        try {
            const cartId = localStorage.getItem("cartId");
            const response = await manageCart(cartId, "removeTotal", {
                ...props,
            });

            if (response?.data?.cartId) {
                localStorage.setItem("cartId", response?.data?.cartId);
            }
        } catch (error) {
            localStorage.removeItem("cartId");
            dispatch(clearCart());
        }
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
                        <p className={classes.btn} onClick={handleAdd}>
                            <PlusIcon />
                        </p>
                        <p>{props.amount}</p>
                        <p className={classes.btn} onClick={handleRemove}>
                            <MinusIcon />
                        </p>
                        <p>יח'</p>
                    </div>
                </div>
                <div onClick={handleRemoveTotal} className={classes.delete}>
                    <p>הסרה</p>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
