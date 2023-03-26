import { useContext, useState } from "react";
import axios from "axios";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CompareContext from "../../store/compare-context";
import Result from "../Result/Result";
import LoadingSpinner from "../UI/LoadingSpinner";
// import ProductsData from "../Products/ProductsData";

const Cart = (props) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ctx = useContext(CompareContext);
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartClearItemsHandler = () => {
    sessionStorage.removeItem("items");
    ctx.clearCart();
  };

  const compare = (items) => {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER + "/compare", items)
      .then((res) => {
        setPrices(res.data);
        setIsLoading(false);
        setShowCarousel(true);
      })
      .catch((err) => console.log(err));
  };
  // for (let i = 0; i < ProductsData.mega.length; i++) {
  //   axios
  //     .post("../../../add_mega", ProductsData.mega[i])
  //     .then((res) => console.log("good"))
  //     .catch((err) => console.log(err));
  // }
  // };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={`${classes["button--alt"]} ${classes["close--btn"]}`} onClick={props.onClose}>
        סגור
      </button>

      {hasItems && (
        <button
          className={`${classes["button--alt"]} ${classes["clear--btn"]} `}
          onClick={cartClearItemsHandler}
        >
          נקה עגלה
        </button>
      )}

      {hasItems && (
        <button
          onClick={() =>
            compare(
              ctx.items
                .map((item) =>
                  item.amount > 1
                    ? new Array(item.amount).fill(item.name)
                    : item.name
                )
                .flat()
            )
          }
          className={`${classes.button} ${classes['compare--btn']}`}
        >
          השווה
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {!isLoading && cartItems}
      {!hasItems && <h5 className={classes.empty}>הוסף מוצרים לעגלה</h5>}
      {!isLoading && modalActions}
      {isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );

  return (
    <>
      {!showCarousel && (
        <Modal background="cart" onClose={props.onClose}>
          {cartModalContent}
        </Modal>
      )}
      {showCarousel && (
        <Modal background="cart" onClose={props.onClose}>
          <Result prices={prices} onClose={props.onClose} />
        </Modal>
      )}
    </>
  );
};

export default Cart;
