import { useEffect, useState, useCallback } from "react";
import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";
import classes from "./Header.module.css";
import LoginIcon from "../../../assets/LoginIcon/LoginIcon";
import CategoriesIconBlack from "../../../assets/CategoriesIconBlack";
import ListIcon from "../../../assets/ListIcon";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./Auth/AuthForm";
import { getFavorites } from "../../../services/favorites-api";
import { ToggleButton } from "../../UI/ToggleButton/ToggleButton";
import LoginButton from "./LoginButton/LoginButton";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import CategoriesButton from "./CategoriesButton/CategoriesButton";
import CartPopup from "./CartPopup/CartPopup";
import CategoriesPopup from "./CategoriesPopup/CategoriesPopup";
import { ToggleButtonMobile } from "../../UI/ToggleButton/Mobile/ToggleButtonMobile";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../../store/Favorites/favoritesSlice";
import { updateItems } from "../../../store/Cart/cartSlice";

const Header = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const loginParam = queryParams.get("login") === "1";
    const verifyParam = queryParams.get("verify") === "1";

    const isLoggedIn = localStorage.getItem("token");

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [cartIsShown, setCartIsShown] = useState(false);
    const [categoriesIsShown, setCategoriesIsShown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1600);
    const [showCarousel, setShowCarousel] = useState(false);
    const [showLogin, setShowLogin] = useState(!isLoggedIn && loginParam);
    const [isVerified, setIsVerified] = useState(verifyParam);

    const cartItems = useSelector((state) => state.cart.items);

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

    const openLoginHandler = () => {
        setShowLogin(true);
    };

    const closeLoginHandler = () => {
        removeQueryParams(["login", "verify"]);
        setShowLogin(false);
    };

    const showFavorites = () => {
        if (!isLoggedIn) {
            setShowLogin(true);
        } else {
        }
    };

    const removeQueryParams = (paramsToRemove) => {
        paramsToRemove.forEach((param) => queryParams.delete(param));

        navigate(
            {
                pathname: location.pathname,
                search: queryParams.toString(),
            },
            { replace: true }
        );
    };

    const getFavoritesHandler = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await getFavorites();
            dispatch(setFavorites(response.data.favorites));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

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
                dispatch(updateItems(JSON.parse(storedItems)));
            }

            getFavoritesHandler();
            setIsFirstRender(false);
        }
    }, [isFirstRender, dispatch, getFavoritesHandler]);

    useEffect(() => {
        if (cartItems.length > 0) {
            sessionStorage.setItem("items", JSON.stringify(cartItems));
        } else {
            sessionStorage.removeItem("items");
        }
    }, [cartItems]);

    return (
        <>
            <div className={classes.header}>
                <div
                    className={`${classes["login-container"]} ${
                        isLoggedIn ? classes["toggle-container"] : ""
                    }`}
                >
                    {isMobile ? (
                        <>
                            <div className={classes["mobile-actions"]}>
                                <LoginButton
                                    isMobile
                                    isLoggedIn={isLoggedIn}
                                    openLoginHandler={openLoginHandler}
                                    showFavorites={showFavorites}
                                />
                                <HeaderCartButton
                                    onClick={cartClickHandler}
                                    isMobile={isMobile}
                                />
                            </div>
                            <Logo
                                isMobile={isMobile}
                                logoClickHandler={logoClickHandler}
                            />
                        </>
                    ) : (
                        <>
                            <div className={classes["logo-container"]}>
                                {!isLoggedIn && (
                                    <button
                                        onClick={openLoginHandler}
                                        className={`${classes.btn} ${classes["login-btn"]}`}
                                    >
                                        <LoginIcon /> כניסה
                                    </button>
                                )}
                                <Logo
                                    isMobile={true}
                                    logoClickHandler={logoClickHandler}
                                />
                            </div>

                            <div>
                                <ToggleButton
                                    isActive={props.showOutOfStock}
                                    onToggleClick={props.toggleClickHandler}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className={classes.container}>
                    {!isMobile && (
                        <div className={classes["side-container"]}>
                            <HeaderCartButton
                                onClick={cartClickHandler}
                                isMobile={isMobile}
                            />
                            <button
                                onClick={showFavorites}
                                className={`${classes.btn} ${classes["categories-btn"]}`}
                            >
                                {<ListIcon />} רשימות שמורות
                            </button>
                        </div>
                    )}

                    {isMobile && (
                        <ToggleButtonMobile
                            isActive={props.showOutOfStock}
                            onToggleClick={props.toggleClickHandler}
                        />
                    )}

                    <SearchBar
                        closeAll={closeAll}
                        isMobile={isMobile}
                        setProductData={props.setProductData}
                    />

                    {isMobile && (
                        <div onClick={categoriesClickHandler}>
                            <CategoriesIconBlack />
                        </div>
                    )}

                    {!isMobile && (
                        <div
                            className={`${classes["side-container"]} ${classes["categories-container"]}`}
                        >
                            <CategoriesButton
                                categoriesClickHandler={categoriesClickHandler}
                                isMobile={isMobile}
                            />
                        </div>
                    )}
                </div>
            </div>
            {cartIsShown && (
                <CartPopup
                    setShowCarousel={setShowCarousel}
                    showCarousel={showCarousel}
                    backToCartHandler={backToCartHandler}
                    setProductData={props.setProductData}
                    isLoggedIn={isLoggedIn}
                    setShowLogin={setShowLogin}
                />
            )}
            <div className={classes.children}>{props.children}</div>
            {categoriesIsShown && (
                <CategoriesPopup
                    isMobile={isMobile}
                    setCategoriesIsShown={setCategoriesIsShown}
                />
            )}
            <AuthForm
                isOpen={showLogin}
                onClose={closeLoginHandler}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
            />
        </>
    );
};
export default Header;
