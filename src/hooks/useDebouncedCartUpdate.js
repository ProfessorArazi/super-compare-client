import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { manageCart } from "../services/cart-api";
import { addItem, clearCart, removeItem } from "../store/Cart/cartSlice";

const useDebouncedCartUpdate = (item) => {
    const dispatch = useDispatch();
    const [debouncedAmount, setDebouncedAmount] = useState(0);
    const debounceTimer = useRef(null);

    const sendCartUpdateRequest = async (totalAmount) => {
        const cartId = localStorage.getItem("cartId");

        try {
            const response = await manageCart(
                cartId,
                totalAmount > 0 ? "add" : "remove",
                {
                    ...item,
                    amount: Math.abs(totalAmount),
                }
            );

            if (response?.data?.cartId) {
                localStorage.setItem("cartId", response?.data?.cartId);
            }
        } catch (error) {
            localStorage.removeItem("cartId");
            dispatch(clearCart());
        }
    };

    const updateCartHandler = (amount) => {
        dispatch(
            amount > 0 ? addItem({ ...item, amount }) : removeItem(item.id)
        );

        setDebouncedAmount((prevAmount) => prevAmount + amount);
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            if (debouncedAmount + amount !== 0) {
                sendCartUpdateRequest(debouncedAmount + amount);
            }
            setDebouncedAmount(0);
        }, 300);
    };

    useEffect(() => {
        return () => clearTimeout(debounceTimer.current);
    }, []);

    return updateCartHandler;
};

export default useDebouncedCartUpdate;
