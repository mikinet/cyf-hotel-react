import React, { useState } from "react";

const Table = props => {
  return (
    <table className="table">
      <THead labels={props.labels} />
      <TBody data={props.data} />
    </table>
  );
};
export default Table;

const THead = props => {
  return (
    <thead className="thead-dark">{<LabelsRow labels={props.labels} />}</thead>
  );
};

const LabelsRow = props => {
  return (
    <tr>
      {props.labels.map((label, index) => (
        <Label key={index} id={index} label={label} />
      ))}
    </tr>
  );
};

const Label = props => {
  const [sortOrder, setSortOrder] = useState(1);
  const changeSortOrder = event => {
    const col = event.target;
    // exclude the "Profile" column- it is a buttons column!
    if (col.textContent === "Profile") {
      return;
    }
    const colId = parseInt(col.id);
    setSortOrder(sortOrder * -1);
    sortBookings(sortOrder, colId);
  };
  return (
    <th id={props.id} onClick={changeSortOrder}>
      {props.label}
    </th>
  );
};

const TBody = props => {
  return (
    <tbody>
      {props.data.map((values, index) => {
        return <DataRow key={index} values={values} />;
      })}
    </tbody>
  );
};

const DataRow = props => {
  // highlight/unhighlight a table row when it is clicked
  const [className, setClassName] = useState("");
  const changeColour = () => {
    if (className === "") {
      setClassName("selected");
      return;
    }
    setClassName("");
  };
  return (
    <tr className={className} onClick={changeColour}>
      {Object.values(props.values).map((value, index) => (
        <Data key={index} value={value} />
      ))}
    </tr>
  );
};

const Data = props => {
  return <td>{props.value}</td>;
};

function sortBookings(order, colId) {
  const tbody = document.querySelector("tbody");
  const dataRows = tbody.childNodes;
  const sortedRows = [...dataRows].sort((row1, row2) => {
    if (row1.children[colId].textContent < row2.children[colId].textContent) {
      return -1 * order;
    }
    return order;
  });
  dataRows.forEach(row => row.remove());
  sortedRows.forEach(row => {
    tbody.appendChild(row);
  });
}
