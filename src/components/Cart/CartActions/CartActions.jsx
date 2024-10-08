import classes from "./CartActions.module.css";

const CartActions = ({ hasItems, onClear, onCompare, onClose }) => {
    return (
        <div className={classes.actions}>
            <button
                className={`${classes["button--alt"]} ${classes["close--btn"]}`}
                onClick={onClose}
            >
                סגור
            </button>

            {hasItems && (
                <button
                    className={`${classes["button--alt"]} ${classes["clear--btn"]}`}
                    onClick={onClear}
                >
                    נקה עגלה
                </button>
            )}

            {hasItems && (
                <button
                    onClick={onCompare}
                    className={`${classes.button} ${classes["compare--btn"]}`}
                >
                    השווה
                </button>
            )}
        </div>
    );
};

export default CartActions;
