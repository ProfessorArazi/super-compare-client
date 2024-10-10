import React from "react";
import classes from "../Result/Result.module.css";
import { Button } from "react-bootstrap";

export const Actions = ({ url, onClose }) => {
    const openMarketSite = () => {
        window.open(url);
    };

    return (
        <div className={classes.actions}>
            <Button
                onClick={openMarketSite}
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
