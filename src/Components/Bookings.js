import React, { useEffect, useState } from "react";
import Search from "./Search.js";
import NewBooking from "./NewBooking";
import SearchResults from "./SearchResults.js";
import BookingDataFetchStatus from "./StatusDisplay";
import { filterData } from "../functions";

// CONSTANTS AND VARIABLES DECLARATION
const timeout = 10; // data fetch waiting time = 5 seconds

/**** THE COMPONENT ****/
const Bookings = () => {
  // STATE VARIABLES
  const [bookings, setBookings] = useState([]);
  const [dataIsFetched, setDataIsFetched] = useState(false);
  const [delaySecondsCount, setDelaySecondsCount] = useState(0);

  // EVENT HANDLERS
  const handleNewBooking = bookingData => {
    bookingData["id"] = bookings.length + 1; // add order number to bookingData
    setBookings([...bookings, bookingData]);
  };

  const searchBookings = searchVal => {
    console.info("TO DO!", searchVal);
    const filteredResult = filterData(bookings, searchVal);
    setBookings(filteredResult);
  };

  // USE_EFFECT
  // fetch booking data from a remote "location"
  useEffect(() => {
    fetch("https://cyf-react.glitch.me/delayed")
      .then(response => response.json())
      .then(data => {
        setDataIsFetched(true);
        setBookings(data);
      })
      .catch(() => setDataIsFetched(false));
  }, []);

  // check the data fetch status and decide whether to display a "wait" or error message
  if (dataIsFetched === false) {
    // if data has not been fetched/loaded, wait until the end of the set timeout
    setTimeout(() => {
      setDelaySecondsCount(delaySecondsCount + 1);
    }, 1000);
  }

  return dataIsFetched ? (
    // on data fetch success, display booking content
    <div className="App-content">
      <div className="container">
        <Search search={searchBookings} />
        <NewBooking newBooking={handleNewBooking} />
        <SearchResults results={bookings} />
      </div>
    </div>
  ) : (
    // otherwise show an error or a wait message depending on whether the timeout is over or not
    <BookingDataFetchStatus count={delaySecondsCount} timeout={timeout} />
  );
};

export default Bookings;
