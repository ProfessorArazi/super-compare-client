import MyCard from "../../UI/MyCard/MyCard";
import classes from "./ProductList.module.css";

const ProductList = ({ products, onProductClick, lastProductRef }) => {
    return (
        <div className={classes.products}>
            {products.map((product, index) => (
                <div
                    ref={index === products.length - 1 ? lastProductRef : null}
                    key={product.id}
                    className={classes.card}
                >
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
