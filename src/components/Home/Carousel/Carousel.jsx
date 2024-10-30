import React, { useState, useRef, useEffect } from "react";
import classes from "./Carousel.module.css";
import Product from "../../Products/Product/Product";
import leftArrow from "../../../assets/left-arrow.png";
import rightArrow from "../../../assets/right-arrow.png";

const Carousel = ({ items, title, onProductClick, hotSale }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);
    const [titleMarginRight, setTitleMarginRight] = useState(-1);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const carouselRef = useRef(null);
    const productContainerRefs = useRef([]);
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

    const updateLayout = (isResize) => {
        if (productRefs.current[0] && carouselRef.current) {
            const itemWidth = productRefs.current[0].offsetWidth;
            const containerWidth = carouselRef.current.offsetWidth;
            const visibleItems = Math.floor(containerWidth / itemWidth) || 1;
            const productWidth = productContainerRefs.current[0]?.offsetWidth;
            setItemsToShow(visibleItems);
            if (!isResize) {
                setTitleMarginRight(
                    (productWidth / visibleItems - itemWidth) / 2
                );
            }

            setIsLayoutReady(true);
        }
    };

    useEffect(() => {
        updateLayout(false);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", () => updateLayout(true));
        return () =>
            window.removeEventListener("resize", () => updateLayout(true));
    }, []);

    return (
        <div
            className={classes["carousel-container"]}
            style={{ visibility: isLayoutReady ? "visible" : "hidden" }}
        >
            <div
                className={classes["carousel-viewport"]}
                ref={carouselRef}
                style={{
                    "--items-to-show": itemsToShow,
                }}
            >
                {titleMarginRight >= 0 && (
                    <h1
                        className={classes["carousel-title"]}
                        style={{ marginRight: `${titleMarginRight}px` }}
                    >
                        {title}
                    </h1>
                )}
                <div
                    className={classes["carousel-items"]}
                    style={{
                        transform: `translateX(${translateValue}%)`,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            ref={(el) =>
                                (productContainerRefs.current[index] = el)
                            }
                            key={item.name}
                            className={classes["carousel-item"]}
                        >
                            <Product
                                ref={(el) => (productRefs.current[index] = el)}
                                {...item}
                                onClickHandler={() => onProductClick(item)}
                                isHotSale={hotSale}
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
