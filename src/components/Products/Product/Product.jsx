import React from "react";
import useImageFallback from "../../../hooks/useImageFallback";
import ProductForm from "../ProductForm/ProductForm";
import { Trapezoid } from "../../../assets/Trapezoid/Trapezoid";
import useDebouncedCartUpdate from "../../../hooks/useDebouncedCartUpdate";
import classes from "./Product.module.css";
import { filterNonSerializableProps } from "../../../utils/filterNonSerializableProps";

const Product = React.forwardRef((props, ref) => {
    const [currentImage, handleImageError] = useImageFallback(props.images);
    const updateCart = useDebouncedCartUpdate(
        filterNonSerializableProps(props)
    );

    const stopPropagation = (event) => {
        event.stopPropagation();
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
                    onAddToCart={(event, amount) => {
                        event.preventDefault();
                        stopPropagation(event);
                        updateCart(amount);
                    }}
                />
            </div>
        </div>
    );
});

export default Product;
