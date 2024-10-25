import React from "react";
import classes from "./ToggleButtonMobile.module.css";

export const ToggleButtonMobile = ({ isActive, onToggleClick }) => {
    return (
        <div
            className={`${classes["toggle-button"]} ${
                isActive ? classes.toggled : ""
            }`}
            onClick={() => onToggleClick(!isActive)}
        >
            <div className={classes["toggle-circle"]} />
        </div>
    );
};
