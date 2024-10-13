import React from "react";
import classes from "./Wrapper.module.css";

export const Wrapper = ({ children }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.children}>{children}</div>
        </div>
    );
};
