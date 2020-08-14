import React, { Fragment, useEffect, useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { getCats, filteredProduct } from "../../operations/catOperations";
import { Shop } from "../Shop/Shop";
import { Button, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { prices } from "../../cores/shared/fixedPrices";
import "./sidebar.css";
const Sidebars = () => {
  ////*** SideBAR HANDLERS */
  ////*** SideBAR HANDLERS */
  const [visible, setVisible] = React.useState(false);
  const toggleVis = () => {
    setVisible(!visible);
  };

  ////*** Getting Cats from Operations */
  ////*** Getting Cats from Operations */
  const [cats, setCats] = useState([]);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [finalResult, setFinalResut] = useState([]);

  const init = () => {
    getCats()
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    init();
    LoadFilteredResult(skip, limit, myFilters.filters);
  }, []);

  const LoadFilteredResult = (newFilters) => {
    filteredProduct(skip, limit, newFilters)
      .then((data) => {
        console.log(data);
        setFinalResut(data.data);
        setSize(data.size);
        console.log(data.size);
        setSkip(0);
      })
      .catch((error) => console.log(error));
  };

  //////LOAD MORE HANDLER /////////////
  const loadMore = () => {
    let toSkip = skip + limit;
    filteredProduct(toSkip, limit, myFilters.filters)
      .then((data) => {
        console.log(data);
        setFinalResut([...finalResult, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      })
      .catch((error) => console.log(error));
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button onClick={loadMore} className="mt-5" id="loadbtn">
          Load More
        </Button>
      )
    );
  };
  ////*** Filter  Handler */
  ////*** Filter  Handler */

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price") {
      let priceValues = handlePrices(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    LoadFilteredResult(myFilters.filters);
    setMyFilters(newFilters);
  };

  ////*** Checkers  Handler */
  ////*** Checkers  Handler */

  const [checker, setChecker] = useState([]);
  const handleToggle = (c) => () => {
    const currentCatId = checker.indexOf(c);
    const newCheckedCatId = [...checker];
    //if curretly checked wasn't already in checked
    //else pull or take oif
    if (currentCatId === -1) {
      newCheckedCatId.push(c);
    } else {
      newCheckedCatId.splice(currentCatId, 1);
    }
    console.log(newCheckedCatId);
    setChecker(newCheckedCatId);
    handleFilters(newCheckedCatId, "category");
  };

  /////////Price Hadnler///////
  const [price, setPrice] = useState(0);
  const handlePriceChange = (event) => {
    handleFilters(event.target.value, "price");
    setPrice(event.target.value);
  };
  const handlePrices = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }

    return array;
  };
  //////////////////////////////
  {
  }
  return (
    <Fragment>
      <Sidebar.Pushable as={Segment} className="mt-0">
        <Sidebar
          as={Menu}
          animation="overlay"
          style={{ background: "black" }}
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="wide"
        >
          <Button
            onClick={toggleVis}
            style={{ color: "#FEEE00", background: "black", border: "0px" }}
          >
            <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
          </Button>
          <Menu.Item style={{ fontWeight: "700" }}>Categories</Menu.Item>
          {cats.map((c, i) => (
            <Menu.Item key={i} className="text-left pl-5 text-sm-left">
              <input
                value={checker.indexOf(c._id === -1)}
                type="checkbox"
                onChange={handleToggle(c._id)}
                className="form-check-input"
              />
              <label
                className="form-check-label"
                style={{ color: "#FEEE00", fontWeight: "700" }}
              >
                {c.name}
              </label>
            </Menu.Item>
          ))}
          <Menu.Item style={{ fontWeight: "700" }}>Price Filter</Menu.Item>
          {prices.map((p, i) => (
            <Menu.Item key={i} className="text-left pl-5 text-sm-left">
              <Input
                id="radio"
                type="radio"
                name={p}
                onChange={(e) => {
                  handlePriceChange(e);
                  toggleVis();
                }}
                value={`${p._id}`}
                className="form-check-input"
              ></Input>
              <Label
                for="radio"
                className="form-check-label mr-5"
                style={{ color: "#FEEE00", fontWeight: "700" }}
              >
                {p.name}
              </Label>
            </Menu.Item>
          ))}
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <Segment basic className="container">
            <Shop
              loadMore={loadMoreButton}
              clicked={toggleVis}
              cats={cats}
              myFilters={myFilters}
              filtered={finalResult}
            ></Shop>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Fragment>
  );
};

export default Sidebars;
