import classes from "./CartItem.module.css";

const CartItem = (props) => {
    const setProduct = (product) => {
        props.setProductData({ ...product, image: product.prices[0].img });
    };

    return (
        <li onClick={() => setProduct(props)} className={classes["cart-item"]}>
            <div className={classes.image}>
                <img src={props.image} alt={props.name} />
            </div>
            <div className={classes.details}>
                <h5>{props.name}</h5>
                <span className={classes.amount}>x {props.amount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={(e) => props.onAdd(e)}>+</button>
                <button onClick={(e) => props.onRemove(e)}>−</button>
            </div>
        </li>
    );
};

export default CartItem;
