import { useCallback, useEffect, useState, useRef, useContext } from "react";
import { Navbar, Nav, Container, Card } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import Cart from "../Cart/Cart";
import classes from "./Header.module.css";
import Logo from "../../assets/super compare new logo.png";
import { links } from "../Products/ProductsData";
import CompareContext from "../../store/compare-context";
import LinkItem from "../UI/LinkItem";
import { GiHamburger, GiMilkCarton, GiNoodles } from "react-icons/gi";
import { FaAppleAlt } from "react-icons/fa";

const Header = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const ctx = useContext(CompareContext);

  const searchRef = useRef();

  const toggleHandler = () => {
    setExpanded(expanded ? false : "expanded");
  };

  const showCartHandler = () => {
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

  let dataLinks = links.map((link) => (
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

  const searchInput = (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="חפש"
        onChange={handleChange}
        className={classes.search}
      />
      {searchResults.length < dataLinks.length && searchResults.length > 0 && (
        <Card className={classes["links-card"]}>
          <ul onClick={resetSearchHandler}>{searchResults}</ul>
        </Card>
      )}
    </div>
  );

  return (
    <>
      <Navbar className={classes["nav-logo"]} dir="rtl">
        {window.innerWidth > 768 && searchInput}
        <Navbar.Brand
          className={classes["nav-brand"]}
          onClick={hideAllHandler}
          as={Link}
          to="/"
        >
          <img className={classes.logo} src={Logo} alt="logo" />
        </Navbar.Brand>
        <HeaderCartButton
          className={classes["cart-button"]}
          onClick={showCartHandler}
        />
      </Navbar>

      <Navbar className={classes.nav} expanded={expanded} expand="lg" dir="rtl">
        <Container>
          {window.innerWidth < 768 && searchInput}

          <Navbar.Toggle
            onClick={toggleHandler}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse className={classes.collapse} id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                className={`${classes.link} ml-auto`}
                onClick={hideAllHandler}
                as={NavLink}
                activeClassName={window.innerWidth > 768 && classes.active}
                to="/products/meats_and_fish"
              >
                <div>
                  <GiHamburger className={classes["nav-icon"]} />
                  בשר ודגים
                </div>
              </Nav.Link>

              <Nav.Link
                className={`${classes.link} ml-auto`}
                onClick={hideAllHandler}
                as={NavLink}
                activeClassName={window.innerWidth > 768 && classes.active}
                to="/products/milks"
              >
                <div>
                  <GiMilkCarton className={classes["nav-icon"]} />
                  מוצרי חלב
                </div>
              </Nav.Link>
              <Nav.Link
                className={`${classes.link} ml-auto`}
                onClick={hideAllHandler}
                as={NavLink}
                activeClassName={window.innerWidth >= 768 && classes.active}
                to="/products/legumes_and_grains"
              >
                <div>
                  <GiNoodles className={classes["nav-icon"]} />
                  קטניות ודגנים
                </div>
              </Nav.Link>
              <Nav.Link
                className={`${classes.link} ml-auto`}
                onClick={hideAllHandler}
                as={NavLink}
                activeClassName={window.innerWidth > 768 && classes.active}
                to="/products/fruits_and_vegetables"
              >
                <div>
                  <FaAppleAlt className={classes["nav-icon"]} />
                  פירות וירקות
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {cartIsShown && <Cart onClose={hideAllHandler} />}
      <div onClick={hideAllHandler}>{props.children}</div>
    </>
  );
};
export default Header;
