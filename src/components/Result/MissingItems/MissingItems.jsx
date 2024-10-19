import React from "react";
import { MissingItem } from "../MissingItem/MissingItem";
import Modal from "../../UI/Modal/Modal";
import classes from "./MissingItems.module.css";

export const MissingItems = ({ products, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <div className={classes.container}>
                {products.map((product) => (
                    <MissingItem
                        key={product.id}
                        name={product.name}
                        images={product.images}
                    />
                ))}
            </div>
        </Modal>
    );
};
