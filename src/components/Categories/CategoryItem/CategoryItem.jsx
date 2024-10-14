import React from "react";
import classes from "./CategoryItem.module.css";
import VectorIcon from "../../../assets/VectorIcon";

export const CategoryItem = ({ clickHandler, name, icon }) => {
    return (
        <div onClick={clickHandler} className={classes.category}>
            <div className={classes.details}>
                <div className={classes.icon}>
                    <img src={icon} alt={name} />
                </div>
                <p>{name}</p>
            </div>
            <VectorIcon />
        </div>
    );
};
