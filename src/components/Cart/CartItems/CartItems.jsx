import CartItem from "../CartItem/CartItem";
import classes from "./CartItems.module.css";

const CartItems = ({ items, setProductData }) => {
    return (
        <ul className={classes["cart-items"]}>
            {items?.map((item) => (
                <CartItem
                    key={item.id}
                    {...item}
                    setProductData={setProductData}
                />
            ))}
        </ul>
    );
};

export default CartItems;
