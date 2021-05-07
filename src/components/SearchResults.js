import React, { useState } from "react";
import moment from "moment";
import Table from "./Table";
import CustomerProfile from "./CustomerProfile";
const labels = [
  "ID",
  "Title",
  "First Name",
  "Surname",
  "Email",
  "Room ID",
  "Checkin Date",
  "Checkout Date",
  "No. of Nights",
  "Profile"
];

const SearchResults = props => {
  const [customerId, setCustomerId] = useState(0);
  const link = `${props.targetUrl}/${customerId}`;
  // EVENT HANDLER
  const showProfile = event => {
    setCustomerId(event.target.id);
  };
  // organise the data to be sent to the Table component for display
  const results = props.results.map(booking => {
    // add "Number of Nights" column
    booking["noOfNights"] = moment(booking.checkOutDate).diff(
      moment(booking.checkInDate),
      "days"
    );
    // add a column that holds "Show Profile" buttons
    booking["profile"] = (
      <button id={booking.id} className="btn btn-primary" onClick={showProfile}>
        Show Profile
      </button>
    );
    return booking;
  });
  return (
    <div className="search-results">
      <Table labels={labels} data={results} />
      {customerId > 0 && <CustomerProfile profileLink={link} />}
    </div>
  );
};

export default SearchResults;
