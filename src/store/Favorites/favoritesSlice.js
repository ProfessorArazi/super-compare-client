import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: [],
    },
    reducers: {
        addFavorite(state, action) {
            state.favorites.push(action.payload);
        },
        editFavorite(state, action) {
            const updatedFavorites = state.favorites.map((fav) =>
                fav.id === action.payload.id
                    ? { ...fav, ...action.payload.favorite }
                    : fav
            );
            state.favorites = updatedFavorites;
        },
        setFavorites(state, action) {
            state.favorites = action.payload;
        },
    },
});

export const { addFavorite, editFavorite, setFavorites } =
    favoritesSlice.actions;
export default favoritesSlice.reducer;
