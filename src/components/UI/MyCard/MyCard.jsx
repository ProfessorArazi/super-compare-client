import { useContext } from "react";
import CompareContext from "../../../store/compare-context";

import { Card } from "react-bootstrap";
import CardForm from "../CardForm/CardForm";
import classes from "./MyCard.module.css";

const MyCard = (props) => {
    const cartCtx = useContext(CompareContext);

    const addToCartHandler = (event, amount) => {
        event.preventDefault();
        event.stopPropagation();
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: +amount,
        });
    };

    return (
        <div>
            <Card
                onClick={props.onClickHandler}
                id={props.id}
                className={classes.card}
            >
                <div className={classes["img-container"]}>
                    <Card.Img
                        className={classes.img}
                        variant="top"
                        src={props.img}
                    />
                </div>
                <Card.Body>
                    <Card.Text className={classes.title}>
                        {props.name}
                    </Card.Text>
                    <CardForm
                        className={classes.form}
                        onAddToCart={addToCartHandler}
                    />
                </Card.Body>
            </Card>
        </div>
    );
};
export default MyCard;