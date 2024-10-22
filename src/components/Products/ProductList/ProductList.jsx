import Product from "../Product/Product";
import classes from "./ProductList.module.css";

const ProductList = ({ products, onProductClick, lastProductRef }) => {
    const setProduct = (result) => {
        onProductClick({ ...result });
    };

    return (
        <div className={classes.products}>
            {products.map((product, index) => (
                <Product
                    ref={index === products.length - 1 ? lastProductRef : null}
                    key={product.id}
                    onClickHandler={() => setProduct(product)}
                    {...product}
                />
            ))}
        </div>
    );
};

export default ProductList;
