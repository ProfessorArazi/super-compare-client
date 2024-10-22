import CategoriesIcon from "../../../../assets/CategoriesIcon";
import CategoriesIconBlack from "../../../../assets/CategoriesIconBlack";
import classes from "./CategoriesButton.module.css";

const CategoriesButton = ({ categoriesClickHandler, isMobile }) => {
    return (
        <button
            className={`${classes.btn} ${classes["categories-btn"]}`}
            onClick={categoriesClickHandler}
        >
            {isMobile ? <CategoriesIconBlack /> : <CategoriesIcon />}
            קטגוריות
        </button>
    );
};

export default CategoriesButton;
