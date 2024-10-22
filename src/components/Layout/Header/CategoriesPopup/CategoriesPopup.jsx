import Categories from "../../../../pages/Categories/Categories";
import classes from "../CartPopup/CartPopup.module.css";

const CategoriesPopup = ({ isMobile, setCategoriesIsShown }) => {
    return (
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
    );
};

export default CategoriesPopup;
