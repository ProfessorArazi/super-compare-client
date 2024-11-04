import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart/cartSlice";
import favoritesReducer from "./Favorites/favoritesSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites: favoritesReducer,
    },
});

export default store;
