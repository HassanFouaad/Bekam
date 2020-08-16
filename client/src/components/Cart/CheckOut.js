import React, { useState, useEffect } from "react";

export default function CheckOut({ products }) {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  return <strong>Total ${getTotal()}</strong>;
}
