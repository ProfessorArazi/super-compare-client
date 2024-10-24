import { useContext } from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "./ProductDetails.module.css";
import CompareContext from "../../../store/Cart/compare-context";
import useImageFallback from "../../../hooks/useImageFallback";
import ProductForm from "../ProductForm/ProductForm";

const ProductDetails = ({ productData, onClose, isOpen }) => {
    const [currentImage, handleImageError] = useImageFallback(
        productData?.images || []
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
                            onAddToCart={addToCartHandler}
                        />
                    </div>
                </div>
                <ul className={classes["list-unstyled"]}>
                    {productData?.prices.map((info) => (
                        <li key={info._id} className={classes.item}>
                            <div className={classes.logo}>
                                <img src={info.logo} alt={info.market} />
                            </div>
                            {!info.price ? (
                                <p className={classes.price}>חסר במלאי</p>
                            ) : (
                                <p className={classes.price}>
                                    <span> מחיר רגיל:</span>
                                    <br />
                                    {info.price.toFixed(2)}
                                </p>
                            )}

                            {info.discount > 0 ? (
                                <p className={classes.discount}>
                                    <span>מבצע: </span>
                                    <br />
                                    {info.discount > 1 && (
                                        <>{info.discount} ב </>
                                    )}
                                    {info.discountPrice.toFixed(2)}
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
