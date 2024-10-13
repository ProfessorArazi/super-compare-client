import steak from "../../assets/steak.png";
import { CategoryItem } from "../../components/Categories/CategoryItem/CategoryItem";
import classes from "./Categories.module.css";

const Categories = () => {
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

    return (
        <ul className={classes.categories}>
            {categories.map((category) => (
                <CategoryItem key={category.name} {...category} />
            ))}
        </ul>
    );
};

export default Categories;
