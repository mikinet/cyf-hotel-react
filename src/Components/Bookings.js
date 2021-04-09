import React, { useEffect, useState } from "react";
import Search from "./Search.js";
import NewBooking from "./NewBooking";
import SearchResults from "./SearchResults.js";

const timeOut = 10; // data fetch waiting time = 5 seconds

// Bookings component definition
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [dataFetchStatus, setDataFetchStatus] = useState(false);
  const [delaySecondsCount, setDelaySecondsCount] = useState(0);

  const handleNewBooking = bookingData => {
    console.log(bookingData);
    if (bookingData) {
      setBookings([...bookings, bookingData]);
    }
  };

  // fetch booking data from a remote "location"
  useEffect(() => {
    fetch("https://cyf-react.glitch.me/delayed")
      .then(response => response.json())
      .then(data => {
        setDataFetchStatus(true);
        setBookings(data);
      })
      .catch(() => setDataFetchStatus(false));
  }, []);

  // check the data fetch status and decide whether to display a "wait" or error message
  if (dataFetchStatus === false) {
    // if data has not been fetched/loaded, wait until the end of the set timeout
    setTimeout(() => {
      setDelaySecondsCount(delaySecondsCount + 1);
    }, 1000);
    // show an error or a wait message depending on whether the timeout is over or not
    return displayStatus(delaySecondsCount);
  }

  // on data fetch success
  const search = searchVal => {
    console.info("TO DO!", searchVal);
    const filteredResult = filterData(bookings, searchVal);
    setBookings(filteredResult);
  };

  return (
    <div className="App-content">
      <div className="container">
        <Search search={search} />
        <NewBooking newBooking={handleNewBooking} id={bookings.length} />
        <SearchResults results={bookings} />
      </div>
    </div>
  );
};

export default Bookings;

// supplementary function definitions

const displayStatus = count => {
  if (count <= timeOut) {
    return <p className="loading">Loading, please wait...</p>;
  }
  return (
    <p className="error">
      Sorry, cannot display booking infromation. Error while fetching data.
    </p>
  );
};

const filterData = (bookingDetails, userInput) => {
  return bookingDetails.filter(customer => {
    // make sure the search is not case-sensitive
    const firstName = customer.firstName.toUpperCase();
    const surname = customer.surname.toUpperCase();
    const value = userInput.toUpperCase();
    return firstName.includes(value) || surname.includes(value);
  });
};
