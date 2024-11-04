import { useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIconWhite from "../../../../assets/CartIcon-white.png";
import CartIconTurquoise from "../../../../assets/CartIcon-turquoise.png";
import { useSelector } from "react-redux";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);

    const numberOfCartItems =
        cartItems?.reduce((curNumber, item) => {
            return curNumber + item.amount;
        }, 0) || 0;

    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ""
    } `;

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartItems]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.badge}>{numberOfCartItems}</span>
            <span className={classes.icon}>
                <img
                    className={classes["cart-icon"]}
                    src={props.isMobile ? CartIconWhite : CartIconTurquoise}
                    alt="cart"
                />
            </span>
        </button>
    );
};
export default HeaderCartButton;
