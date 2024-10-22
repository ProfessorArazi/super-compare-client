import React from "react";
import classes from "./ResultItem.module.css";

export const ResultItem = ({ price, showMissing }) => {
    const navigateHandler = (link) => {
        window.open(link, "_blank");
    };

    return (
        <div className={classes.card}>
            <div className={classes.topRow}>
                <div className={classes.company}>
                    <img src={price[1].logo} alt={price[0]} />
                </div>
                <div className={classes.price}>
                    <h3>מחיר: ₪{price[1].price.toFixed(2)}</h3>
                    {price[1].missing.length > 0 && (
                        <p onClick={() => showMissing(price[1].missing)}>
                            {price[1].missing.length === 1
                                ? "פריט 1 חסר במלאי "
                                : `${price[1].missing.length} פריטים חסרים במלאי`}
                        </p>
                    )}
                </div>
            </div>
            <button
                onClick={() => navigateHandler(price[1].url)}
                className={classes.marketButton}
            >
                הזמנה
            </button>
        </div>
    );
};
