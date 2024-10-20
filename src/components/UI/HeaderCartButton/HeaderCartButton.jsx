import { useContext, useEffect, useState } from "react";
import CompareContext from "../../../store/Cart/compare-context";
import classes from "./HeaderCartButton.module.css";
import CartIconWhite from "../../../assets/CartIcon-white.png";
import CartIconTurquoise from "../../../assets/CartIcon-turquoise.png";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const ctx = useContext(CompareContext);

    const numberOfCartItems =
        ctx.items?.reduce((curNumber, item) => {
            return curNumber + item.amount;
        }, 0) || 0;

    const { items } = ctx;

    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ""
    } `;

    useEffect(() => {
        if (!items || items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

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
