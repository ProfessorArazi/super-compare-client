import Modal from "../../UI/Modal/Modal";
import classes from "./ProductDetails.module.css";

const ProductDetails = ({ productData, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <div className={classes["text-center"]}>
                <h3>{productData.name}</h3>
                <ul className={classes["list-unstyled"]}>
                    {productData.prices
                        .sort(
                            (a, b) =>
                                (a.discountPrice || a.price) -
                                (b.discountPrice || b.price)
                        )
                        .map((info) => (
                            <li key={info._id} className="mb-3">
                                <h6>{info.market}</h6>
                                <p>
                                    {`מחיר${info.discount ? " רגיל: " : ": "}`}
                                    <strong>{info.price.toFixed(2)}</strong>
                                </p>
                                {info.discount > 0 && (
                                    <p>
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
