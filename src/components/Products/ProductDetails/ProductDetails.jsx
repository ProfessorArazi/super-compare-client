import React, { useEffect } from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "./ProductDetails.module.css";
import useImageFallback from "../../../hooks/useImageFallback";
import ProductForm from "../ProductForm/ProductForm";
import useDebouncedCartUpdate from "../../../hooks/useDebouncedCartUpdate";

const ProductDetails = ({ productData, onClose, isOpen }) => {
    const [currentImage, handleImageError, setHasError] = useImageFallback(
        productData?.images || []
    );

    const addToCartHandler = useDebouncedCartUpdate(productData);

    useEffect(() => {
        setHasError(false);
    }, [productData, setHasError]);

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className={classes["text-center"]}>
                <img
                    src={currentImage}
                    alt={productData?.name}
                    className={classes.image}
                    onError={handleImageError}
                />

                <h3>{productData?.name}</h3>
                <div className={classes["form-wrapper"]}>
                    <div className={classes["form-container"]}>
                        <ProductForm
                            className={classes.form}
                            onAddToCart={(event, amount) => {
                                event.preventDefault();
                                addToCartHandler(amount);
                            }}
                        />
                    </div>
                </div>
                <ul className={classes["list-unstyled"]}>
                    {productData?.prices.map((info) => (
                        <li key={info._id} className={classes.item}>
                            <div className={classes.logo}>
                                <img src={info.logo} alt={info.market} />
                                <p className={classes.price}>
                                    {!info.price
                                        ? "חסר במלאי"
                                        : `מחיר רגיל: ₪${info.price.toFixed(
                                              2
                                          )}`}
                                </p>
                            </div>

                            {info.discount > 0 && (
                                <div className={classes.discount}>
                                    <p>
                                        במבצע:{" "}
                                        <span
                                            className={
                                                classes["discount-price"]
                                            }
                                        >
                                            {info.discount > 1 &&
                                                `${info.discount} ב- `}{" "}
                                            ₪{info.discountPrice.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default ProductDetails;
