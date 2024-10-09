import { useState } from "react";
import classes from "./CardForm.module.css";
import { Button } from "react-bootstrap";

const CardForm = ({ onAddToCart, stopPropagation }) => {
    const [fade, setFade] = useState(false);
    const [amount, setAmount] = useState(1);

    const handleButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onAddToCart(event, amount);
    };

    const handleInputChange = (event) => {
        setAmount(event.target.value);
    };

    return (
        <form className={classes.form}>
            <Button
                type="button"
                variant="light"
                onClick={(event) => {
                    setFade(true);
                    handleButtonClick(event);
                }}
                onAnimationEnd={() => setFade(false)}
                className={
                    !fade ? classes.button : `${classes.button} ${classes.fade}`
                }
            >
                הוסף לעגלה
            </Button>
            <input
                name="amount"
                className={classes.input}
                type="number"
                value={amount}
                min="1"
                onChange={handleInputChange}
                onClick={stopPropagation}
            />
        </form>
    );
};
export default CardForm;
