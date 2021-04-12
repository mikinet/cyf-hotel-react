import React from "react";

const StatusDisplay = ({ count, timeout }) => {
  if (count <= timeout) {
    return <p className="loading">Loading, please wait...</p>;
  }
  return (
    <p className="error">
      Sorry, cannot display booking infromation. Error while fetching data.
    </p>
  );
};
export default StatusDisplay;
