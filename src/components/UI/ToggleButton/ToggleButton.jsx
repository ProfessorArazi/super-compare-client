import React, { useState } from "react";
import classes from "./ToggleButton.module.css";

export const ToggleButton = ({ isActive, onToggleClick }) => {
    const [isToggled, setIsToggled] = useState(isActive);

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
        onToggleClick();
    };

    return (
        <div
            className={`${classes["toggle-button"]} ${
                isToggled ? classes.toggled : ""
            }`}
            onClick={handleToggle}
        >
            <div className={classes["toggle-circle"]} />
        </div>
    );
};
