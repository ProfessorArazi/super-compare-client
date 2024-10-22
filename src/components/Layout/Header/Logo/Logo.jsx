import LogoMobile from "../../../../assets/logo-white.png";
import LogoWeb from "../../../../assets/logo.png";
import classes from "./Logo.module.css";

const Logo = ({ isMobile, logoClickHandler }) => {
    return (
        <img
            onClick={logoClickHandler}
            className={classes.logo}
            src={isMobile ? LogoMobile : LogoWeb}
            alt="logo"
        />
    );
};

export default Logo;
