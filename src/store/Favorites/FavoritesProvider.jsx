import { useReducer } from "react";
import FavoritesContext from "./favorites-context";

const defaultFavoritesState = {
    favorites: [],
};

const addFavorite = (state, action) => {
    return {
        ...state,
        favorites: [...state.favorites, action.favorite],
    };
};

const editFavorite = (state, action) => {
    const updatedFavorites = state.favorites.map((fav) =>
        fav.id === action.id ? { ...fav, ...action.favorite } : fav
    );
    return {
        ...state,
        favorites: updatedFavorites,
    };
};

const setFavorites = (state, action) => {
    return {
        ...state,
        favorites: action.favorites,
    };
};

const favoritesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return addFavorite(state, action);
        case "EDIT":
            return editFavorite(state, action);
        case "SET":
            return setFavorites(state, action);
        default:
            return defaultFavoritesState;
    }
};

const FavoritesProvider = (props) => {
    const [favoritesState, dispatchFavoritesAction] = useReducer(
        favoritesReducer,
        defaultFavoritesState
    );

    const addFavoriteHandler = (favorite) => {
        dispatchFavoritesAction({ type: "ADD", favorite });
    };

    const editFavoriteHandler = (id, favorite) => {
        dispatchFavoritesAction({ type: "EDIT", id, favorite });
    };

    const setFavoritesHandler = (favorites) => {
        dispatchFavoritesAction({ type: "SET", favorites });
    };

    const favoritesContext = {
        favorites: favoritesState.favorites,
        addFavorite: addFavoriteHandler,
        editFavorite: editFavoriteHandler,
        setFavorites: setFavoritesHandler,
    };

    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {props.children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;
