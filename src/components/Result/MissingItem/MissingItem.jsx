import React from "react";
import useImageFallback from "../../../hooks/useImageFallback";
import classes from "./MissingItem.module.css";

export const MissingItem = ({ name, images }) => {
    const [currentImage, handleImageError] = useImageFallback(images);

    return (
        <>
            <div className={classes.container}>
                <img
                    className={classes.img}
                    src={currentImage}
                    alt={name}
                    onError={handleImageError}
                />
                <p className={classes.name}>{name}</p>
            </div>
        </>
    );
};
