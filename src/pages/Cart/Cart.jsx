import { useContext, useState } from "react";
import axios from "axios";
import Modal from "../../components/UI/Modal/Modal";
import CompareContext from "../../store/compare-context";
import CartModalContent from "../../components/Cart/CartModalContent/CartModalContext";
import Result from "../../components/Cart/Result/Result";

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

    return (
        <Modal background="cart" onClose={props.onClose}>
            {showCarousel ? (
                <Result
                    prices={Object.entries(prices)}
                    onClose={props.onClose}
                />
            ) : (
                <CartModalContent
                    items={ctx.items}
                    onRemove={cartItemRemoveHandler}
                    onAdd={cartItemAddHandler}
                    onClear={cartClearItemsHandler}
                    onCompare={() => compare(ctx.items)}
                    isLoading={isLoading}
                    hasItems={hasItems}
                    onClose={props.onClose}
                />
            )}
        </Modal>
    );
};

export default Cart;
