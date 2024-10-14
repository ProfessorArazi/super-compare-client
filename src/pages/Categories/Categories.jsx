import { useNavigate } from "react-router-dom";
import steak from "../../assets/steak.png";
import carrot from "../../assets/carrot.png";
import cake from "../../assets/cake.png";
import croisant from "../../assets/croisant.png";
import hotdog from "../../assets/hot-dog.png";
import meat from "../../assets/meat.png";
import wine from "../../assets/wine.png";
import pretzel from "../../assets/pretzel.png";
import { CategoryItem } from "../../components/Categories/CategoryItem/CategoryItem";
import classes from "./Categories.module.css";

const Categories = ({ isMobile, setCategoriesIsShown }) => {
    const categories = [
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "ירקות ופירות", icon: carrot },
        { name: "מוצרי חלב", icon: steak },
        { name: "לחמים, עוגות ועוגיות", icon: cake },
        { name: "שימורים, בישול ואפייה", icon: croisant },
        { name: "דגנים", icon: steak },
        { name: "מעדנייה, סלטים ונקניקים", icon: hotdog },
        { name: "קפואים", icon: meat },
        { name: "משקאות ויין", icon: wine },
        { name: "בריאות ותזונה", icon: steak },
        { name: "חטיפים וממתקים", icon: pretzel },
        { name: "ניקיון", icon: steak },
    ];

    const navigate = useNavigate();

    const categoryHandler = (name) => {
        navigate(`/products/${name}`);
        if (isMobile) {
            setCategoriesIsShown(false);
        }
    };

    return (
        <ul className={classes.categories}>
            {categories.map((category) => (
                <CategoryItem
                    clickHandler={() => categoryHandler(category.name)}
                    key={category.name}
                    {...category}
                />
            ))}
        </ul>
    );
};

export default Categories;
