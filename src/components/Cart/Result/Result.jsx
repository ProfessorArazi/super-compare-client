import classes from "./Result.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Actions } from "../Actions/Actions";

const Result = ({ prices, onClose }) => {
    return (
        <>
            <Carousel
                className={classes.carousel}
                showThumbs={false}
                useKeyboardArrows={true}
                showStatus={false}
            >
                {prices
                    .sort((a, b) => a[1].price - b[1].price)
                    .map((price) => (
                        <div key={price[1].url}>
                            <p>סופר : {price[0]}</p>
                            <p>מחיר : {price[1].price.toFixed(2)}</p>

                            <Actions url={price[1].url} onClose={onClose} />
                        </div>
                    ))}
            </Carousel>
        </>
    );
};
export default Result;
