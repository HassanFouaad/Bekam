import React from "react";
import { DisplayProducts } from "../components/Products/DisplayProducts";

export default function Home() {
  return (
    <div className="d-flex">
      <div className="container-fluid"><DisplayProducts></DisplayProducts></div>
    </div>
  );
}
