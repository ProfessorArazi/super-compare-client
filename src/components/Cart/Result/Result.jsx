import classes from "./Result.module.css";

const Result = ({ prices, onClose }) => {
    return (
        <>
            <div className={classes.grid}>
                {prices
                    .sort((a, b) => a[1].price - b[1].price)
                    .map((price) => (
                        <a
                            key={price[1].url}
                            href={price[1].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.card}
                        >
                            <h3>{price[0]}</h3>
                            <p>מחיר : {price[1].price.toFixed(2)}</p>
                            <a
                                href={price[1].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.marketButton}
                            >
                                הזמנה
                            </a>
                        </a>
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
