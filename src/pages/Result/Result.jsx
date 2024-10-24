import { useState } from "react";
import classes from "./Result.module.css";
import { MissingItems } from "../../components/Result/MissingItems/MissingItems";
import { ResultItem } from "../../components/Result/ResultItem/ResultItem";

const Result = ({ prices }) => {
    const [missing, setMissing] = useState(null);

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
                        <ResultItem
                            key={price[1].url}
                            price={price}
                            showMissing={showMissing}
                        />
                    ))}
            </div>
            <MissingItems
                products={missing}
                onClose={closeMissing}
                isOpen={missing}
            />
        </>
    );
};

export default Result;
