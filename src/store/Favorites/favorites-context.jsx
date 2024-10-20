import React from "react";

const FavoritesContext = React.createContext({
    favorites: [],

    addFavorite: (favorite) => {},
    editFavorite: (id, favorite) => {},
    setFavorites: (favorites) => {},
});

export default FavoritesContext;
