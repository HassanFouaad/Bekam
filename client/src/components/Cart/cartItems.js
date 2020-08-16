import React, { Fragment, useState } from "react";
import { FaRegFolderOpen, FaTrashAlt } from "react-icons/fa";
import { API } from "../../config";
import { updateItem, removeItem } from "../../operations/shoppingCart";

export const ShowItems = ({ p, i, setRun = (f) => f, run = undefined }) => {
  const [count, setCount] = useState(p.count);

  const handleChange = (producId) => (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    setRun(!run);
    console.log(e.target.value);
    if (e.target.value >= 1) {
      updateItem(producId, e.target.value);
    }
  };

  return (
    <Fragment>
      <tr key={i}>
        <td className="ml-1">
          <div className="row">
            <div className="col-sm-2 hidden-xs">
              <img
                src={`${API}/product/photo/${p._id}`}
                alt="..."
                className="img-responsive img-fluid"
              />
            </div>
            <div className="col-sm-10 ml-1">
              <h4 className="nomargin">{p.name}</h4>
              <p>{p.description}</p>
            </div>
          </div>
        </td>
        <td>{p.price}</td>
        <td>
          <input
            type="number"
            className="form-control text-center"
            value={count}
            onChange={handleChange(p._id)}
          />
        </td>
        <td id="actions">
          <button className="btn btn-sm" style={{ background: "#FEEE00" }}>
            <FaTrashAlt
              size="30px"
              onClick={() => {
                removeItem(p._id);
                setRun(!run);
              }}
            ></FaTrashAlt>
          </button>
        </td>
      </tr>
    </Fragment>
  );
};
