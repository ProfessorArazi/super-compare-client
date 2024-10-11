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
            <div className={classes["text-center"]}>
                <img
                    src={productData.image}
                    alt={productData.name}
                    className={classes.image}
                />
                <CardForm
                    className={classes.form}
                    onAddToCart={addToCartHandler}
                />
                <h3>{productData.name}</h3>
                <ul className={classes["list-unstyled"]}>
                    {productData.prices
                        .sort((a, b) =>
                            a.discountPrice && !b.discountPrice
                                ? -1
                                : b.discountPrice && !a.discountPrice
                                ? 1
                                : (a.discountPrice || a.price) -
                                  (b.discountPrice || b.price)
                        )
                        .map((info) => (
                            <li key={info._id} className="mb-3">
                                <h6>{info.market}</h6>
                                <p className={classes.price}>
                                    {`מחיר${info.discount ? " רגיל: " : ": "}`}
                                    <strong>{info.price.toFixed(2)}</strong>
                                </p>
                                {info.discount > 0 && (
                                    <p className={classes.discount}>
                                        {info.discount === 1 ? (
                                            <strong>מבצע: </strong>
                                        ) : (
                                            <>
                                                <strong>
                                                    {info.discount}{" "}
                                                </strong>
                                                ב{" "}
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
