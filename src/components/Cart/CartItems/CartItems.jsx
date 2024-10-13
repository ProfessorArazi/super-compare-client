import CartItem from "../CartItem/CartItem";
import classes from "./CartItems.module.css";

const CartItems = ({
    items,
    onRemove,
    onRemoveTotal,
    onAdd,
    setProductData,
}) => {
    return (
        <ul className={classes["cart-items"]}>
            {items?.map((item) => (
                <CartItem
                    key={item.id}
                    {...item}
                    onRemove={(e) => onRemove(e, item.id)}
                    onRemoveTotal={(e) => onRemoveTotal(e, item.id)}
                    onAdd={(e) => onAdd(e, item)}
                    setProductData={setProductData}
                />
            ))}
        </ul>
    );
};

export default CartItems;
