import { useContext, useState } from "react";
import CompareContext from "../../../store/compare-context";
import CardForm from "../CardForm/CardForm";
import classes from "./Card.module.css";

const Card = (props) => {
    const cartCtx = useContext(CompareContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const addToCartHandler = (event, amount) => {
        event.preventDefault();
        stopPropagation(event);
        cartCtx.addItem({
            ...props,
            image: props.images[currentImageIndex],
            amount: +amount,
        });
    };

    const handleImageError = () => {
        if (currentImageIndex < props.images.length - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div
            onClick={props.onClickHandler}
            id={props.id}
            className={classes.card}
        >
            <div className={classes["img-container"]}>
                <img
                    className={classes.img}
                    src={props.images[currentImageIndex]}
                    alt={props.name}
                    onError={handleImageError}
                />
            </div>
            <div className={classes.content}>
                {props.brand && <p className={classes.brand}>{props.brand}</p>}
                <p className={classes.title}>{props.name}</p>
                <CardForm
                    className={classes.form}
                    onAddToCart={addToCartHandler}
                    stopPropagation={stopPropagation}
                />
            </div>
        </div>
    );
};

export default Card;
