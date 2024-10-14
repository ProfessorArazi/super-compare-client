import { useEffect, useState, useContext } from "react";
import HeaderCartButton from "../../UI/HeaderCartButton/HeaderCartButton";
import Cart from "../../../pages/Cart/Cart";
import classes from "./Header.module.css";
import LogoMobile from "../../../assets/logo-white.png";
import LogoWeb from "../../../assets/logo.png";
import CompareContext from "../../../store/compare-context";
import { SearchInput } from "../../UI/SearchInput/SearchInput";
import LoginIcon from "../../../assets/LoginIcon";
import SaveIcon from "../../../assets/SaveIcon";
import TrashIcon from "../../../assets/TrashIcon";
import Categories from "../../../pages/Categories/Categories";
import CategoriesIconBlack from "../../../assets/CategoriesIconBlack";
import CategoriesIcon from "../../../assets/CategoriesIcon";
import ListIcon from "../../../assets/ListIcon";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/ArrowLeftIcon";

const Header = (props) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [cartIsShown, setCartIsShown] = useState(false);
    const [categoriesIsShown, setCategoriesIsShown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1600);
    const [showCarousel, setShowCarousel] = useState(false);

    const navigate = useNavigate();

    const ctx = useContext(CompareContext);

    const cartItemRemoveHandler = (event, id) => {
        event.stopPropagation();
        ctx.removeItem(id);
    };

    const cartItemRemoveTotalHandler = (event, id) => {
        event.stopPropagation();
        ctx.removeTotalItem(id);
    };

    const cartItemAddHandler = (event, item) => {
        event.stopPropagation();
        ctx.addItem({ ...item, amount: 1 });
    };

    const cartClearItemsHandler = () => {
        sessionStorage.removeItem("items");
        ctx.clearCart();
    };

    const cartClickHandler = () => {
        if (cartIsShown) {
            closeCart();
        } else {
            setCartIsShown(true);
        }
        if (isMobile) setCategoriesIsShown(false);
    };

    const closeCart = () => {
        setCartIsShown(false);
        backToCartHandler();
    };

    const categoriesClickHandler = () => {
        setCategoriesIsShown((prev) => !prev);
        if (isMobile) closeCart(false);
    };

    const closeAll = () => {
        if (isMobile) {
            setCategoriesIsShown(false);
            closeCart(false);
        }
    };

    const backToCartHandler = () => {
        setShowCarousel(false);
    };

    const logoClickHandler = () => {
        closeAll();
        navigate("/");
    };

    useEffect(() => {
        if (isMobile && (cartIsShown || categoriesIsShown)) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [cartIsShown, categoriesIsShown, isMobile]);

    useEffect(() => {
        const updateScreenSize = () => {
            setIsMobile(window.innerWidth <= 1600);
        };

        window.addEventListener("resize", updateScreenSize);
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    useEffect(() => {
        if (isFirstRender) {
            const storedItems = sessionStorage.getItem("items");
            if (storedItems) {
                ctx.updateItems(JSON.parse(storedItems));
            }
            setIsFirstRender(false);
        } else {
            if (ctx.items.length) {
                sessionStorage.setItem("items", JSON.stringify(ctx.items));
            } else {
                sessionStorage.removeItem("items");
            }
        }
    }, [ctx, isFirstRender]);

    return (
        <>
            <div className={classes.header}>
                <div className={classes["login-container"]}>
                    {isMobile ? (
                        <>
                            <div className={classes["mobile-actions"]}>
                                <HeaderCartButton onClick={cartClickHandler} />
                                <LoginIcon />
                            </div>
                            <img
                                onClick={logoClickHandler}
                                className={classes.logo}
                                src={LogoMobile}
                                alt="logo"
                            />
                        </>
                    ) : (
                        <button className={classes.btn}>
                            <LoginIcon /> כניסה
                        </button>
                    )}
                </div>

                <div className={classes.container}>
                    {!isMobile && (
                        <div className={classes["side-container"]}>
                            <HeaderCartButton onClick={cartClickHandler} />
                            <button
                                className={`${classes.btn} ${classes["categories-btn"]}`}
                            >
                                {<ListIcon />} רשימות שמורות
                            </button>
                        </div>
                    )}
                    <div className={classes["search-container"]}>
                        <SearchInput
                            closeAll={closeAll}
                            isMobile={isMobile}
                            setProductData={props.setProductData}
                        />
                        {isMobile && (
                            <div
                                onClick={categoriesClickHandler}
                                className={classes["categories-icon"]}
                            >
                                <CategoriesIconBlack />
                            </div>
                        )}
                    </div>

                    {!isMobile && (
                        <div
                            className={`${classes["side-container"]} ${classes["categories-container"]}`}
                        >
                            <img
                                onClick={logoClickHandler}
                                className={classes.logo}
                                src={LogoWeb}
                                alt="logo"
                            />
                            <button
                                onClick={categoriesClickHandler}
                                className={`${classes.btn} ${classes["categories-btn"]}`}
                            >
                                קטגוריות <CategoriesIcon />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {cartIsShown && (
                <div className={classes["side-popup"]}>
                    <div className={classes["side-title"]}>
                        <h3>הסל שלי</h3>
                        <div className={classes["side-title-actions"]}>
                            {showCarousel ? (
                                <div
                                    onClick={backToCartHandler}
                                    className={classes["side-title-action"]}
                                >
                                    <ArrowLeftIcon />
                                    חזרה לסל
                                </div>
                            ) : (
                                <div
                                    onClick={cartClearItemsHandler}
                                    className={classes["side-title-action"]}
                                >
                                    <TrashIcon />
                                    ניקוי סל
                                </div>
                            )}
                            <div className={classes["side-title-action"]}>
                                <SaveIcon /> שמירת סל
                            </div>
                        </div>
                    </div>
                    <Cart
                        items={ctx.items}
                        onAdd={cartItemAddHandler}
                        onRemove={cartItemRemoveHandler}
                        onRemoveTotal={cartItemRemoveTotalHandler}
                        setProductData={props.setProductData}
                        showCarousel={showCarousel}
                        setShowCarousel={setShowCarousel}
                    />
                </div>
            )}

            {categoriesIsShown && (
                <div
                    className={`${classes["side-popup"]} ${classes["categories-popup"]}`}
                >
                    <div className={classes["side-title"]}>
                        <h3>קטגוריות</h3>
                    </div>
                    <Categories
                        isMobile={isMobile}
                        setCategoriesIsShown={setCategoriesIsShown}
                    />
                </div>
            )}
        </>
    );
};
export default Header;
