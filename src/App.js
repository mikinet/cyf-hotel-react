import React from "react";
import Header from "./components/Header";
import Bookings from "./components/Bookings";
import TouristInfoCards from "./components/TouristInfoCards";
import Restaurant from "./components/Restaurant";
import Footer from "./components/Footer";
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
