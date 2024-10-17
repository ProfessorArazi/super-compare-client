import { useState } from "react";
import classes from "./CardForm.module.css";

const CardForm = ({ onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const inputClickHandler = (event) => {
        event.stopPropagation();
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onAddToCart(event, quantity);
    };

    return (
        <div className={classes["card-form-container"]}>
            <div onClick={handleButtonClick}>
                <p className={classes["add-to-cart-button"]}>הוספה לעגלה</p>
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
export default CardForm;
