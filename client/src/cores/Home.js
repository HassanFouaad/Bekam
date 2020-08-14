import React, { Fragment, useEffect } from "react";
import { Shop } from "../components/Shop/Shop";
import Sidebars from "../components/SideBar/Sidebar";
import { Jumbotron } from "reactstrap";
import "../components/Shop/shop.css";
export default function Home() {
  useEffect(() => {
    document.title = "Bekam - Online Trade Handler";
  }, []);
  return (
    <Fragment>
      <Jumbotron id="summberJum">
        <h2 id="h23">Summer Discounds are here!</h2>
      </Jumbotron>
      <Sidebars></Sidebars>
    </Fragment>
  );
}
