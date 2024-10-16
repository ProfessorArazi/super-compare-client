import { useContext } from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "./ProductDetails.module.css";
import CompareContext from "../../../store/compare-context";
import CardForm from "../../UI/CardForm/CardForm";

const ProductDetails = ({ productData, onClose }) => {
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
            <div className={classes["modal-header"]}>
                <button className={classes["close-button"]} onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className={classes["text-center"]}>
                <img
                    src={productData.image}
                    alt={productData.name}
                    className={classes.image}
                />
                <div className={classes["form-wrapper"]}>
                    <div className={classes["form-container"]}>
                        <CardForm
                            className={classes.form}
                            onAddToCart={addToCartHandler}
                        />
                    </div>
                </div>
                <h3>{productData.name}</h3>
                <ul className={classes["list-unstyled"]}>
                    {productData.prices.map((info) => (
                        <li key={info._id} className="mb-3">
                            <h6>{info.market}</h6>
                            <p className={classes.price}>
                                {!info.price ? (
                                    "חסר במלאי"
                                ) : (
                                    <>
                                        מחיר {info.discount ? " רגיל: " : ": "}
                                        <strong>
                                            {" "}
                                            {info.price.toFixed(2)}
                                        </strong>
                                    </>
                                )}
                            </p>
                            {info.discount > 0 && (
                                <p className={classes.discount}>
                                    {info.discount === 1 ? (
                                        <strong>מבצע: </strong>
                                    ) : (
                                        <>
                                            <strong>{info.discount} </strong>ב{" "}
                                        </>
                                    )}
                                    <strong>
                                        {info.discountPrice.toFixed(2)}
                                    </strong>
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default ProductDetails;
