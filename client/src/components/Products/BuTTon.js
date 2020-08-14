import React, { Fragment } from "react";
import { addItem } from "../../operations/shoppingCart";
import { Button } from "reactstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

export const BuTTon = ({ product }) => {
  const addToCart = () => {
    addItem(product, () => {
      ToastsStore.success(`Added ${product.name} to Cart`);
    });
  };
  return (
    <Fragment>
      <Button className="mt-2 mb-1 text-center" id="btn" onClick={addToCart}>
        Add to Cart
      </Button>
      <ToastsContainer
        store={ToastsStore}
        id="sb7"
        className="toaster"
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </Fragment>
  );
};
