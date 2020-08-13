import React, { Fragment, useEffect, useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { getCats } from "../../operations./catOperations";
import { Shop } from "../Shop/Shop";
import { Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Sidebars = () => {
  const [visible, setVisible] = React.useState(false);
  const [cats, setCats] = useState([]);
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
  };

  const init = () => {
    getCats()
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    init();
  }, []);
  const toggleVis = () => {
    setVisible(!visible);
  };
  return (
    <Fragment >
      <Button
        onClick={toggleVis}
        style={{ background: "#033244", border: "0px" }}
      >
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </Button>

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="wide"
        >
          {cats.map((c, i) => (
            <Menu.Item key={i} className="text-left pl-4 text-sm-left">
              <input
                value={checker.indexOf(c._id === -1)}
                type="checkbox"
                onChange={handleToggle(c._id)}
                className="form-check-input"
              />
              <label className="form-check-label">{c.name}</label>
            </Menu.Item>
          ))}
        </Sidebar>
        <Sidebar.Pusher dimmed={visible}>
          <Segment basic>
            <Shop clicked={toggleVis}></Shop>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Fragment>
  );
};

export default Sidebars;
