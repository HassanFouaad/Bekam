import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../operations/operations";
import { Link } from "react-router-dom";
import { orderList } from "../../operations/orderOperations";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const loadOrders = () => {
    orderList;
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return <div></div>;
}
