import React from "react";
import classes from "./Trapezoid.module.css";

export const Trapezoid = ({ title }) => {
    return (
        <div className={classes["clipped-shape"]}>
            <svg width="0" height="0">
                <defs>
                    <clipPath
                        id="roundedClip"
                        clipPathUnits="objectBoundingBox"
                    >
                        <polygon points="0.05 1, 0.95 1, 1 0, 0 0" />
                    </clipPath>
                </defs>
            </svg>
            <p>{title}</p>
        </div>
    );
};
