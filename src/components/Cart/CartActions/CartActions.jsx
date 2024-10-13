import classes from "./CartActions.module.css";

const CartActions = ({ hasItems, onCompare }) => {
    return (
        <div className={classes.actions}>
            {hasItems && (
                <button
                    onClick={onCompare}
                    className={`${classes["compare--btn"]}`}
                >
                    השוואה
                </button>
            )}
        </div>
    );
};

export default CartActions;
