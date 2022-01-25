import React from "react";

const CompareContext = React.createContext({
  items: [],

  addItem: () => {},
  removeItem: (id) => {},
  clearCart: () => {},
  updateItems: (items) => {},
});

export default CompareContext;
