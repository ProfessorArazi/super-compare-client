import { useCallback, useEffect, useState, useContext } from "react";
import HeaderCartButton from "../../UI/HeaderCartButton/HeaderCartButton";
import Cart from "../../../pages/Cart/Cart";
import classes from "./Header.module.css";
import Logo from "../../../assets/logo.png";
import CompareContext from "../../../store/compare-context";
import { SearchInput } from "../../UI/SearchInput/SearchInput";
import LoginIcon from "../../../assets/LoginIcon";
import CategoriesIcon from "../../../assets/CategoriesIcon";
import ListIcon from "../../../assets/ListIcon";
import SaveIcon from "../../../assets/SaveIcon";
import TrashIcon from "../../../assets/TrashIcon";
import Categories from "../../../pages/Categories/Categories";

const Header = (props) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [cartIsShown, setCartIsShown] = useState(false);
    const [categoriesIsShown, setCategoriesIsShown] = useState(false);

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
        setCartIsShown((prev) => !prev);
    };

    const categoriesClickHandler = () => {
        setCategoriesIsShown((prev) => !prev);
    };

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

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            setCartIsShown(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    }, [escFunction]);

    return (
        <>
            <div className={classes.header}>
                <div className={classes["login-container"]}>
                    <button className={classes.btn}>
                        {<LoginIcon />} כניסה
                    </button>
                </div>
                <div className={classes.container}>
                    <div className={classes["side-container"]}>
                        <HeaderCartButton onClick={cartClickHandler} />
                        <button
                            className={`${classes.btn} ${classes["categories-btn"]}`}
                        >
                            {<ListIcon />} רשימות שמורות
                        </button>
                    </div>

                    <div className={classes["search-container"]}>
                        <SearchInput setProductData={props.setProductData} />
                    </div>
                    <div
                        className={`${classes["side-container"]} ${classes["categories-container"]}`}
                    >
                        <img src={Logo} alt="logo" />
                        <button
                            onClick={categoriesClickHandler}
                            className={`${classes.btn} ${classes["categories-btn"]}`}
                        >
                            קטגוריות {<CategoriesIcon />}
                        </button>
                    </div>
                </div>
            </div>
            <>
                <div
                    className={`${classes["side-popup"]} ${
                        cartIsShown ? classes.show : ""
                    }`}
                >
                    <div className={classes["side-title"]}>
                        <h3>הסל שלי</h3>
                        <div className={classes["side-title-actions"]}>
                            <div
                                onClick={cartClearItemsHandler}
                                className={classes["side-title-action"]}
                            >
                                {<TrashIcon />} ניקוי סל
                            </div>
                            <div className={classes["side-title-action"]}>
                                {<SaveIcon />} שמירת סל
                            </div>
                        </div>
                    </div>
                    <Cart
                        items={ctx.items}
                        onAdd={cartItemAddHandler}
                        onRemove={cartItemRemoveHandler}
                        onRemoveTotal={cartItemRemoveTotalHandler}
                        setProductData={props.setProductData}
                    />
                </div>

                <div
                    className={`${classes["side-popup"]} ${
                        classes["categories-popup"]
                    } ${categoriesIsShown ? classes.show : ""}`}
                >
                    <div className={classes["side-title"]}>
                        <h3>קטגוריות</h3>
                    </div>
                    <Categories />
                </div>
            </>
        </>
    );
};
export default Header;
