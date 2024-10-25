import React from "react";
import classes from "./ToggleButton.module.css";

export const ToggleButton = ({ isActive, onToggleClick }) => {
    return (
        <div className={classes["toggle-container"]}>
            <button
                className={`${classes["toggle-button"]} ${
                    isActive ? classes.active : ""
                }`}
                onClick={() => onToggleClick(true)}
            >
                עם מוצרים חסרים
            </button>
            <button
                className={`${classes["toggle-button"]} ${
                    !isActive ? classes.active : ""
                }`}
                onClick={() => onToggleClick(false)}
            >
                ללא מוצרים חסרים
            </button>
        </div>
    );
};
