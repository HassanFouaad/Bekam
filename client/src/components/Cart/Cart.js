import React, { useState, useEffect } from "react";
import { getCart } from "../../operations/shoppingCart";
export const Cart = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getCart());
  }, []);

  return <div></div>;
};
