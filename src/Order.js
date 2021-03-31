import React, { useState } from "react";
import RestaurantButton from "./RestaurantButton";

const Order = ({ orderType }) => {
  const [orders, setOrders] = useState(0);

  const orderOne = () => {
    setOrders(orders + 1);
  };

  const removeOne = () => {
    if (orders > 0) {
      setOrders(orders - 1);
    }
  };
  return (
    <li className="order-item">
      <span>
        {orderType}: {orders}{" "}
      </span>
      <RestaurantButton caption="&#8679;" action={orderOne} />
      <RestaurantButton caption="&#8681;" action={removeOne} />
    </li>
  );
};
export default Order;
