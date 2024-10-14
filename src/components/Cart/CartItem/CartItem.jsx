import classes from "./CartItem.module.css";
import PlusIcon from "../../../assets/PlusIcon";
import MinusIcon from "../../../assets/MinusIcon";

const CartItem = (props) => {
    const setProduct = (product) => {
        props.setProductData({ ...product, image: product.prices[0].img });
    };

    return (
        <li className={classes.item}>
            <div className={classes["cart-item"]}>
                <img
                    onClick={() => setProduct(props)}
                    className={classes.img}
                    src={props.image}
                    alt={props.name}
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
