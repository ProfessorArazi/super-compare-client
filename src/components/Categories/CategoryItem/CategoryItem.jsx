import React from "react";
import classes from "./CategoryItem.module.css";
import VectorIcon from "../../../assets/VectorIcon";
import { useNavigate } from "react-router-dom";

export const CategoryItem = ({ name, icon }) => {
    const navigate = useNavigate();

    const categoryHandler = () => {
        navigate(`/products/${name}`);
    };

    return (
        <div onClick={categoryHandler} className={classes.category}>
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
