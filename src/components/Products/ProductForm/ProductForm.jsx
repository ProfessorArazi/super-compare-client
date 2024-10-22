import { useState } from "react";
import classes from "./ProductForm.module.css";

const ProductForm = ({ onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [isBumping, setIsBumping] = useState(false);

    const inputClickHandler = (event) => {
        event.stopPropagation();
    };

    const handleButtonClick = (event) => {
        event.stopPropagation();

        setIsBumping(true);
        setTimeout(() => {
            setIsBumping(false);
        }, 300);

        onAddToCart(event, quantity);
    };

    return (
        <div
            className={`${classes["card-form-container"]} ${
                isBumping ? classes.bump : ""
            }`}
        >
            <div onClick={handleButtonClick}>
                <p className={classes["add-to-cart-button"]}></p>
            </div>
            <input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
                onClick={inputClickHandler}
                className={classes["quantity-input"]}
                min="1"
            />
        </div>
    );
};
export default ProductForm;
