import CartItem from "../CartItem/CartItem";
import classes from "./CartItems.module.css";

const CartItems = ({ items, onRemove, onAdd }) => {
    return (
        <ul className={classes["cart-items"]}>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    amount={item.amount}
                    onRemove={() => onRemove(item.id)}
                    onAdd={() => onAdd(item)}
                />
            ))}
        </ul>
    );
};

export default CartItems;
