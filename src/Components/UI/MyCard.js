import { useContext } from "react";
import CompareContext from "../../store/compare-context";

import { Card } from "react-bootstrap";
import CardForm from "./CardForm";
import classes from "./MyCard.module.css";

const MyCard = (props) => {
  const cartCtx = useContext(CompareContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: +amount,
    });
  };

  return (
    <div id={props.id}>
      <Card className={classes.card}>
        <Card.Img className={classes.img} variant="top" src={props.img} />
        <Card.Body>
          <Card.Text className={classes.title}>{props.name}</Card.Text>
          <CardForm className={classes.form} onAddToCart={addToCartHandler} />
        </Card.Body>
      </Card>
    </div>
  );
};
export default MyCard;
