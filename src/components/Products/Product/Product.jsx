import { useContext } from "react";
import CompareContext from "../../../store/Cart/compare-context";
import classes from "./Product.module.css";
import React from "react";
import useImageFallback from "../../../hooks/useImageFallback";
import ProductForm from "../ProductForm/ProductForm";

const Product = React.forwardRef((props, ref) => {
    const [currentImage, handleImageError] = useImageFallback(props.images);
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
                    src={currentImage}
                    alt={props.name}
                    onError={handleImageError}
                />
            </div>
            <div className={classes.content}>
                <p className={classes.brand}>{props.brand}</p>
                <p className={classes.title}>{props.name}</p>
                <p className={classes.range}>{`${props.maxPrice.toFixed(2)}${
                    props.minPrice !== props.maxPrice
                        ? ` - ${props.minPrice.toFixed(2)}`
                        : ""
                } ₪`}</p>
                <ProductForm
                    className={classes.form}
                    onAddToCart={addToCartHandler}
                    stopPropagation={stopPropagation}
                />
            </div>
        </div>
    );
});

export default Product;
