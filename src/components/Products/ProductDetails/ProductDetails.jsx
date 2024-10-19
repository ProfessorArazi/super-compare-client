import { useContext } from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "./ProductDetails.module.css";
import CompareContext from "../../../store/compare-context";
import CardForm from "../../UI/CardForm/CardForm";
import useImageFallback from "../../../hooks/useImageFallback";

const ProductDetails = ({ productData, onClose }) => {
    const [currentImage, handleImageError] = useImageFallback(
        productData.images
    );
    const cartCtx = useContext(CompareContext);

    const addToCartHandler = (event, amount) => {
        event.preventDefault();
        cartCtx.addItem({
            ...productData,
            amount: +amount,
        });
    };

    return (
        <Modal onClose={onClose}>
            <div className={classes["modal-header"]}></div>
            <div className={classes["text-center"]}>
                <img
                    src={currentImage}
                    alt={productData.name}
                    className={classes.image}
                    onError={handleImageError}
                />

                <h3>{productData.name}</h3>
                <div className={classes["form-wrapper"]}>
                    <div className={classes["form-container"]}>
                        <CardForm
                            className={classes.form}
                            onAddToCart={addToCartHandler}
                        />
                    </div>
                </div>
                <ul className={classes["list-unstyled"]}>
                    {productData.prices.map((info) => (
                        <li key={info._id} className={classes.item}>
                            <div className={classes.logo}>
                                <img src={info.logo} alt={info.market} />
                            </div>
                            <p className={classes.price}>
                                {!info.price ? (
                                    "חסר במלאי"
                                ) : (
                                    <>
                                        מחיר רגיל:
                                        <strong>
                                            {" "}
                                            {info.price.toFixed(2)}
                                        </strong>
                                    </>
                                )}
                            </p>
                            {info.discount > 0 ? (
                                <p className={classes.discount}>
                                    <strong>מבצע: </strong>
                                    {info.discount > 1 && (
                                        <>
                                            <strong>{info.discount} </strong>ב{" "}
                                        </>
                                    )}
                                    <strong>
                                        {info.discountPrice.toFixed(2)}
                                    </strong>
                                </p>
                            ) : (
                                <p className={classes.discount}></p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default ProductDetails;
