import React, { useState, useRef, useEffect } from "react";
import classes from "./Carousel.module.css";
import Product from "../../Products/Product/Product";
import leftArrow from "../../../assets/left-arrow.png";
import rightArrow from "../../../assets/right-arrow.png";

const Carousel = ({ items, title, onProductClick, hotSale }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);
    const carouselRef = useRef(null);
    const productRefs = useRef([]);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + itemsToShow < items.length ? prev + 1 : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? items.length - itemsToShow : prev - 1
        );
    };

    const translateValue = currentIndex * (100 / itemsToShow);

    useEffect(() => {
        const updateItemsToShow = () => {
            if (productRefs.current[0]) {
                const itemWidth = productRefs.current[0].offsetWidth;
                const containerWidth = carouselRef.current.offsetWidth;
                const visibleItems = Math.floor(containerWidth / itemWidth);
                setItemsToShow(visibleItems > 0 ? visibleItems : 1);
            }
        };

        updateItemsToShow();
        window.addEventListener("resize", updateItemsToShow);

        return () => window.removeEventListener("resize", updateItemsToShow);
    }, []);

    return (
        <div className={classes["carousel-container"]}>
            <div
                className={classes["carousel-viewport"]}
                ref={carouselRef}
                style={{
                    "--items-to-show": itemsToShow,
                }}
            >
                <h1 className={classes["carousel-title"]}>{title}</h1>{" "}
                <div
                    className={classes["carousel-items"]}
                    style={{
                        transform: `translateX(${translateValue}%)`,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.name}
                            className={classes["carousel-item"]}
                        >
                            <Product
                                ref={(el) => (productRefs.current[index] = el)}
                                {...item}
                                onClickHandler={() => onProductClick(item)}
                                hotSale={hotSale}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.actions}>
                <img src={rightArrow} alt="prev" onClick={prevSlide} />
                <img src={leftArrow} alt="next" onClick={nextSlide} />
            </div>
        </div>
    );
};

export default Carousel;
