import React from "react";

const RestaurantButton = ({ caption, action }) => {
  return (
    <button className="btn btn-primary" onClick={action}>
      {caption}
    </button>
  );
};
export default RestaurantButton;
