import Card from "../../UI/Card/Card";
import classes from "./ProductList.module.css";

const ProductList = ({ products, onProductClick, lastProductRef }) => {
    const setProduct = (result) => {
        onProductClick({ ...result, image: result.prices[0].img });
    };

    return (
        <div className={classes.products}>
            {products.map((product, index) => (
                <div
                    ref={index === products.length - 1 ? lastProductRef : null}
                    key={product.id}
                    className={classes.card}
                >
                    <Card
                        onClickHandler={() => setProduct(product)}
                        {...product}
                        images={product.prices.map((product) => product.img)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
