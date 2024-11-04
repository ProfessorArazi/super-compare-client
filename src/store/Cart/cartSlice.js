import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem(state, action) {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (existingCartItemIndex >= 0) {
                state.items[existingCartItemIndex].amount +=
                    action.payload.amount;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem(state, action) {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );
            if (existingCartItemIndex >= 0) {
                const existingItem = state.items[existingCartItemIndex];
                if (existingItem.amount === 1) {
                    state.items.splice(existingCartItemIndex, 1);
                } else {
                    existingItem.amount -= 1;
                }
            }
        },
        removeTotalItem(state, action) {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clearCart(state) {
            state.items = [];
        },
        updateItems(state, action) {
            state.items = action.payload;
        },
    },
});

export const { addItem, removeItem, removeTotalItem, clearCart, updateItems } =
    cartSlice.actions;
export default cartSlice.reducer;
