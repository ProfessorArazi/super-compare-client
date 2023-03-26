import { useRef, useState } from "react";
import classes from "./CardForm.module.css";
import { Button } from "react-bootstrap";

const CardForm = (props) => {
  const [fade, setFade] = useState(false);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Button
        type="submit"
        variant="light"
        onClick={() => setFade(true)}
        onAnimationEnd={() => setFade(false)}
        className={!fade ? classes.button : `${classes.button} ${classes.fade}`}
      >
        הוסף לעגלה
      </Button>
      <input
        onChange={(e) => {
          if (e.target.value === "") {
            e.target.value = 1;
          }
        }}
        id={"amount_" + Math.random()}
        ref={amountInputRef}
        className={classes.input}
        type="number"
        min="1"
        max="10"
        defaultValue="1"
      ></input>
    </form>
  );
};
export default CardForm;
