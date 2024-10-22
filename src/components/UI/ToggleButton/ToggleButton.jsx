import React from "react";
import classes from "./ToggleButton.module.css";

export const ToggleButton = ({ isActive, onToggleClick }) => {
    return (
        <div
            className={`${classes["toggle-button"]} ${
                isActive ? classes.toggled : ""
            }`}
            onClick={onToggleClick}
        >
            <div className={classes["toggle-circle"]} />
        </div>
    );
};
