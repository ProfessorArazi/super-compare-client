import { useState } from "react";
import classes from "./Result.module.css";
import { MissingItems } from "../../components/Result/MissingItems/MissingItems";

const Result = ({ prices }) => {
    const [missing, setMissing] = useState(null);

    const navigateHandler = (link) => {
        window.open(link, "_blank");
    };

    const showMissing = (missing) => {
        setMissing(missing);
    };

    const closeMissing = () => {
        setMissing(null);
    };

    return (
        <>
            <div className={classes.grid}>
                {prices
                    .sort(
                        (a, b) =>
                            a[1].missing.length - b[1].missing.length ||
                            a[1].price - b[1].price
                    )
                    .map((price) => (
                        <div key={price[1].url} className={classes.card}>
                            <div className={classes.topRow}>
                                <div className={classes.company}>
                                    <img src={price[1].logo} alt={price[0]} />
                                </div>
                                <div className={classes.price}>
                                    <h3>מחיר: ₪{price[1].price.toFixed(2)}</h3>
                                    {price[1].missing.length > 0 && (
                                        <p
                                            onClick={() =>
                                                showMissing(price[1].missing)
                                            }
                                        >
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
                    ))}
            </div>
            {missing && (
                <MissingItems products={missing} onClose={closeMissing} />
            )}
        </>
    );
};

export default Result;
