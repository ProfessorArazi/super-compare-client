import React from "react";
import classes from "../Result/Result.module.css";
import { Button } from "react-bootstrap";

export const Actions = ({ onClose }) => {
    return (
        <div className={classes.actions}>
            <Button
                href={"https://www.mega.co.il/"}
                className={`${classes.button} ${classes["compare--btn"]}`}
            >
                הזמן
            </Button>
            <Button
                onClick={onClose}
                className={`${classes.button} ${classes["close--btn"]}`}
            >
                סגור
            </Button>
        </div>
    );
};
