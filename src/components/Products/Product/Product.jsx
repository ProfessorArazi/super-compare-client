import { useContext } from "react";
import CompareContext from "../../../store/Cart/compare-context";
import classes from "./Product.module.css";
import React from "react";
import useImageFallback from "../../../hooks/useImageFallback";
import ProductForm from "../ProductForm/ProductForm";
import { Trapezoid } from "../../../assets/Trapezoid/Trapezoid";

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
            {props.isHotSale && (
                <Trapezoid
                    title={`${
                        props.hotSale.discount > 1
                            ? `${props.hotSale.discount} `
                            : ""
                    }בהנחה`}
                />
            )}
            <div
                className={`${classes["img-container"]} ${
                    props.isHotSale ? classes["hot-sale"] : ""
                }`}
            >
                <img
                    className={classes.img}
                    src={currentImage}
                    alt={props.name}
                    onError={handleImageError}
                />
            </div>
            <div className={classes.content}>
                {props.isHotSale ? (
                    <div className={classes.market}>
                        <p>{props.hotSale.market}</p>
                    </div>
                ) : (
                    <p className={classes.brand}>{props.brand}</p>
                )}
                <p className={classes.title}>{props.name}</p>

                {!props.isHotSale ? (
                    <p className={classes.range}>
                        {`${props.minPrice.toFixed(2)}${
                            props.minPrice !== props.maxPrice
                                ? `₪ - ${props.maxPrice.toFixed(2)}`
                                : ""
                        }₪`}
                    </p>
                ) : (
                    <p>
                        <span
                            className={`${classes.discount} ${
                                props.hotSale.discount === 1
                                    ? `${classes["regular-price"]}`
                                    : ""
                            }`}
                        >
                            {props.hotSale.discount > 1
                                ? `${props.hotSale.discount} ב-`
                                : `₪${props.hotSale.regularPrice.toFixed(
                                      2
                                  )}`}{" "}
                        </span>
                        <span className={classes.range}>
                            ₪{props.hotSale.discountPrice.toFixed(2)}
                        </span>
                    </p>
                )}
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
