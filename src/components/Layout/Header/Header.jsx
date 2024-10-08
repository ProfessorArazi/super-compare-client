import { useCallback, useEffect, useState, useRef, useContext } from "react";
import { Navbar, Nav, Card } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import HeaderCartButton from "../../UI/HeaderCartButton/HeaderCartButton";
import Cart from "../../../pages/Cart/Cart";
import classes from "./Header.module.css";
import Logo from "../../../assets/super compare new logo.png";
import CompareContext from "../../../store/compare-context";
import LinkItem from "../../UI/LinkItem/LinkItem";
import { GiHamburger, GiMilkCarton, GiNoodles } from "react-icons/gi";
import { FaAppleAlt } from "react-icons/fa";

const Header = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [cartIsShown, setCartIsShown] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const ctx = useContext(CompareContext);

    const searchRef = useRef();
    const listRef = useRef();

    const toggleHandler = () => {
        setExpanded(expanded ? false : "expanded");
    };

    const showCartHandler = () => {
        window.scrollTo({ top: 0 });
        setCartIsShown(true);
        setExpanded(false);
    };

    const hideAllHandler = () => {
        setCartIsShown(false);
        setExpanded(false);
    };

    useEffect(() => {
        if (ctx.items.length > 0) {
            sessionStorage.setItem("items", JSON.stringify(ctx.items));
        } else if (sessionStorage.getItem("items")) {
            const items = JSON.parse(sessionStorage.getItem("items"));
            ctx.updateItems(items);
        }
    }, [ctx]);

    let dataLinks = [].map((link) => (
        <LinkItem link={link.link} img={link.img} name={link.name} />
    ));

    const handleChange = (e) => {
        const results = dataLinks.filter((link) =>
            link.props.name.toLowerCase().startsWith(e.target.value)
        );
        setSearchResults(results);
    };

    const resetSearchHandler = () => {
        setSearchResults([]);
        searchRef.current.value = "";
    };

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

    useEffect(() => {
        function handleClickOutside(event) {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listRef]);

    const searchInput = (
        <div className={classes.search}>
            <input
                ref={searchRef}
                type="text"
                placeholder="חפש"
                onChange={handleChange}
                onFocus={handleChange}
            />
            {searchResults.length < dataLinks.length &&
                searchResults.length > 0 && (
                    <Card ref={listRef} className={classes["links-card"]}>
                        <ul onClick={resetSearchHandler}>{searchResults}</ul>
                    </Card>
                )}
        </div>
    );

    return (
        <>
            <div className={!cartIsShown && classes.sticky}>
                <Navbar className={classes["nav-logo"]} dir="rtl">
                    {window.innerWidth > 992 && searchInput}
                    {window.innerWidth > 992 ? (
                        <>
                            <Navbar.Brand
                                className={classes["nav-brand"]}
                                onClick={hideAllHandler}
                                as={Link}
                                to="/"
                            >
                                <img
                                    className={classes.logo}
                                    src={Logo}
                                    alt="logo"
                                />
                            </Navbar.Brand>
                            <HeaderCartButton
                                className={classes["cart-button"]}
                                onClick={showCartHandler}
                            />
                        </>
                    ) : (
                        <>
                            <HeaderCartButton
                                className={classes["cart-button"]}
                                onClick={showCartHandler}
                            />
                            <Navbar.Brand
                                className={classes["nav-brand"]}
                                onClick={hideAllHandler}
                                as={Link}
                                to="/"
                            >
                                <img
                                    className={classes.logo}
                                    src={Logo}
                                    alt="logo"
                                />
                            </Navbar.Brand>
                        </>
                    )}
                </Navbar>

                <Navbar
                    className={classes.nav}
                    expanded={expanded}
                    expand="lg"
                    dir="rtl"
                >
                    {window.innerWidth <= 992 && searchInput}

                    <Navbar.Toggle
                        onClick={toggleHandler}
                        aria-controls="basic-navbar-nav"
                    />
                    <Navbar.Collapse
                        className={classes.collapse}
                        id="basic-navbar-nav"
                    >
                        <Nav.Link
                            className={`${classes.link} ml-auto`}
                            onClick={hideAllHandler}
                            as={NavLink}
                            activeClassName={
                                window.innerWidth > 768 && classes.active
                            }
                            to="/products/בשר"
                        >
                            <div>
                                <GiHamburger className={classes["nav-icon"]} />
                                בשר
                            </div>
                        </Nav.Link>

                        <Nav.Link
                            className={`${classes.link} ml-auto`}
                            onClick={hideAllHandler}
                            as={NavLink}
                            activeClassName={
                                window.innerWidth > 768 && classes.active
                            }
                            to="/products/חלב"
                        >
                            <div>
                                <GiMilkCarton className={classes["nav-icon"]} />
                                חלב
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            className={`${classes.link} ml-auto`}
                            onClick={hideAllHandler}
                            as={NavLink}
                            activeClassName={
                                window.innerWidth >= 768 && classes.active
                            }
                            to="/products/דגנים"
                        >
                            <div>
                                <GiNoodles className={classes["nav-icon"]} />
                                דגנים
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            className={`${classes.link} ml-auto`}
                            onClick={hideAllHandler}
                            as={NavLink}
                            activeClassName={
                                window.innerWidth > 768 && classes.active
                            }
                            to="/products/פירות"
                        >
                            <div>
                                <FaAppleAlt className={classes["nav-icon"]} />
                                פירות
                            </div>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            {cartIsShown && <Cart onClose={hideAllHandler} />}
            <div onClick={hideAllHandler}>{props.children}</div>
        </>
    );
};
export default Header;
