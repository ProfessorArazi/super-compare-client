import { useParams } from "react-router-dom";
import ProductsData from "./ProductsData";
import MyCard from "../UI/MyCard";
import classes from "./Products.module.css";

const Products = () => {
  const { product } = useParams();
  let products = ProductsData[product].map(
    (x, i) => (x = { ...x, id: product + i })
  );

  products = products.map((product) => (
    <div key={product.id} className={classes.card}>
      <MyCard id={product.id} name={product.name} img={product.img}></MyCard>
    </div>
  ));

  return (
    <>
      {product === "fruits_and_vegetables" && (
        <h3 className={classes.fruits}>מחיר פר קילוגרם</h3>
      )}
      <div className={classes.products}>{products}</div>
    </>
  );
};
export default Products;
