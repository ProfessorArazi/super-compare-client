import { useCallback, useEffect, useState, useContext } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderCartButton from "../../UI/HeaderCartButton/HeaderCartButton";
import Cart from "../../../pages/Cart/Cart";
import classes from "./Header.module.css";
import Logo from "../../../assets/super compare new logo.png";
import CompareContext from "../../../store/compare-context";
import { SearchInput } from "../../UI/SearchInput/SearchInput";

const Header = (props) => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const ctx = useContext(CompareContext);

    const cartClickHandler = () => {
        setCartIsShown((prev) => !prev);
    };

    useEffect(() => {
        if (ctx.items.length > 0) {
            sessionStorage.setItem("items", JSON.stringify(ctx.items));
        } else if (sessionStorage.getItem("items")) {
            const items = JSON.parse(sessionStorage.getItem("items"));
            ctx.updateItems(items);
        }
    }, [ctx]);

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
            <div className={classes.sticky}>
                <Navbar className={classes["nav-logo"]} dir="rtl">
                    <Navbar.Brand
                        className={classes["nav-brand"]}
                        as={Link}
                        to="/"
                    >
                        <img className={classes.logo} src={Logo} alt="logo" />
                    </Navbar.Brand>
                    {window.innerWidth > 992 && (
                        <SearchInput setProductData={props.setProductData} />
                    )}
                    <HeaderCartButton
                        className={classes["cart-button"]}
                        onClick={cartClickHandler}
                    />
                </Navbar>
            </div>
            <Cart isOpen={cartIsShown} setProductData={props.setProductData} />
            {window.innerWidth <= 992 && (
                <div>
                    <SearchInput setProductData={props.setProductData} />
                </div>
            )}
            <div
                className={`${classes.children} ${
                    cartIsShown ? classes["open-cart"] : ""
                }`}
            >
                {props.children}
            </div>
        </>
    );
};
export default Header;
