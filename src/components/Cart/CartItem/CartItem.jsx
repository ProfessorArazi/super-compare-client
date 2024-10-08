import classes from "./CartItem.module.css";

const CartItem = (props) => {
    return (
        <li className={classes["cart-item"]}>
            <div className={classes.actions}>
                <button onClick={props.onAdd}>+</button>
                <button onClick={props.onRemove}>−</button>
            </div>

            <div>
                <h5>{props.name}</h5>
                <span className={classes.amount}>x {props.amount}</span>
            </div>
        </li>
    );
};

export default CartItem;
