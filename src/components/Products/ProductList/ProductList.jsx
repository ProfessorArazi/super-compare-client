import MyCard from "../../UI/MyCard/MyCard";
import classes from "./ProductList.module.css";

const ProductList = ({ products, onProductClick }) => {
    return (
        <div className={classes.products}>
            {products.map((product) => (
                <div key={product.id} className={classes.card}>
                    <MyCard
                        onClickHandler={() => onProductClick(product)}
                        id={product.id}
                        name={product.name}
                        img={product.prices[0].img}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
