import { useReducer } from "react";
import CompareContext from "./compare-context";

const defaultCartState = {
    items: [],
};

const addItem = (state, action) => {
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
        const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    } else {
        updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems };
};

const removeItem = (state, action) => {
    const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
        const updatedItem = {
            ...existingItem,
            amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems };
};

const clearCart = () => {
    return { items: [] };
};

const updateItems = (action) => {
    return { items: action.items };
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return addItem(state, action);
        case "REMOVE":
            return removeItem(state, action);
        case "CLEAR":
            return clearCart();
        case "UPDATE":
            return updateItems(action);
        default:
            return defaultCartState;
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    };

    const updateCartHandler = (items) => {
        dispatchCartAction({ type: "UPDATE", items });
    };

    const compareContext = {
        items: cartState.items,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
        updateItems: updateCartHandler,
    };

    return (
        <CompareContext.Provider value={compareContext}>
            {props.children}
        </CompareContext.Provider>
    );
};

export default CartProvider;
