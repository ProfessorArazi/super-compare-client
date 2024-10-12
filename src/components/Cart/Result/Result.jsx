import classes from "./Result.module.css";

const Result = ({ prices, onClose }) => {
    const navigateHandler = (link) => {
        window.open(link, "_blank");
    };

    return (
        <>
            <div className={classes.grid}>
                {prices
                    .sort((a, b) => a[1].price - b[1].price)
                    .map((price) => (
                        <div
                            onClick={() => navigateHandler(price[1].url)}
                            key={price[1].url}
                            className={classes.card}
                        >
                            <h3>{price[0]}</h3>
                            <p>מחיר : {price[1].price.toFixed(2)}</p>
                            <div
                                onClick={() => navigateHandler(price[1].url)}
                                className={classes.marketButton}
                            >
                                הזמנה
                            </div>
                        </div>
                    ))}
            </div>
            <div className={classes.backButtonContainer}>
                <button onClick={onClose} className={classes.backButton}>
                    חזרה לעגלה
                </button>
            </div>
        </>
    );
};

export default Result;
