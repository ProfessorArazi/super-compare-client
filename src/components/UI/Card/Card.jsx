import { useContext } from "react";
import CompareContext from "../../../store/compare-context";
import CardForm from "../CardForm/CardForm";
import classes from "./Card.module.css";
import React from "react";

const Card = React.forwardRef((props, ref) => {
    const cartCtx = useContext(CompareContext);

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    const addToCartHandler = (event, amount) => {
        event.preventDefault();
        stopPropagation(event);
        cartCtx.addItem({
            ...props,
            amount: +amount,
        });
    };

    return (
        <div
            onClick={props.onClickHandler}
            id={props.id}
            className={classes.card}
            ref={ref}
        >
            <div className={classes["img-container"]}>
                <img
                    className={classes.img}
                    src={props.image}
                    alt={props.name}
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
});

export default Card;
