import React, { useEffect } from "react";
import MainRouter from "./MainRouter";

import "./App.css";
import { Provider } from "react-redux";
import { CartReducers } from "react-cart-components";
import { createStore, combineReducers } from "redux";

function App() {
  const store = createStore(
    combineReducers({
      cart: CartReducers,
      // Your own reducers here,
    })
  );
  return (

      <MainRouter></MainRouter>
  );
}

export default App;
