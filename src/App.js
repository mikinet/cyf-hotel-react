import React from "react";
import Header from "./components/Header.js";
import Bookings from "./components/Bookings.js";
import TouristInfoCards from "./components/TouristInfoCards.js";
import Restaurant from "./components/Restaurant.js";
import Footer from "./components/Footer.js";
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
