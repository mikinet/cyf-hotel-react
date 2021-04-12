import React from "react";
import Header from "./Header.js";
import Bookings from "./Bookings.js";
import TouristInfoCards from "./TouristInfoCards.js";
import Restaurant from "./Restaurant.js";
import Footer from "./Footer.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <TouristInfoCards />
      <Bookings />
      <Restaurant />
      <Footer
        contact={[
          "123 Fake Street, London, E1 4UD",
          "hello@fakehotel.com",
          "0123 456789"
        ]}
      />
    </div>
  );
};

export default App;
