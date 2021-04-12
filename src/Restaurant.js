import React from "react";
import Order from "./components/Order";
const Restaurant = () => {
  return (
    <div className="orders container">
      <h3>Restaurant Orders</h3>
      <ul className="orders">
        <Order orderType="Pizzas" />
        <Order orderType="Salads" />
        <Order orderType="Chocolate cake" />
      </ul>
    </div>
  );
};

export default Restaurant;
