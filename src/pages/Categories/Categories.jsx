import { useNavigate } from "react-router-dom";
import steak from "../../assets/steak.png";
import { CategoryItem } from "../../components/Categories/CategoryItem/CategoryItem";
import classes from "./Categories.module.css";

const Categories = ({ isMobile, setCategoriesIsShown }) => {
    const categories = [
        { name: "בשר", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
        { name: "עוף, בשר ודגים", icon: steak },
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
