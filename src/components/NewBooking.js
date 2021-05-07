import React, { useState } from "react";
import Form from "./Form";
import Button from "./Button";
import { getTheNextDayDate } from "../functions";

// CONSTANTS AND VARIABLES DECLARATION
const [day, month, year] = new Date().toLocaleDateString("en-GB").split("/");
const TODAY = [year, month, day].join("-");
const INITIAL_FORM_DATA = {
  titles: {
    id: "Title",
    options: [
      { placeholder: "Mr", value: "Mr" },
      { placeholder: "Mr", value: "Mr" },
      { placeholder: "Mrs", value: "Mrs" },
      { placeholder: "Miss", value: "Miss" },
      { placeholder: "(N/A)", value: "NA" }
    ],
    value: ""
  },
  firstName: {
    id: "First Name",
    placeholder: "First Name",
    value: ""
  },
  surname: {
    id: "Surname",
    placeholder: "Surname",
    value: ""
  },
  email: {
    id: "Email",
    placeholder: "Email: someone@example.com",
    value: ""
  },
  roomNoLabel: {
    for: "Room number",
    caption: "Room:"
  },
  roomId: {
    id: "Room number",
    min: 1,
    value: ""
  },
  checkinDate: {
    id: "Checkin date",
    min: TODAY,
    value: TODAY
  },
  checkoutDate: {
    id: "Checkout date",
    min: getTheNextDayDate(TODAY),
    value: getTheNextDayDate(TODAY)
  },
  button: { id: "Book", caption: "Book" }
};

/**** THE COMPONENT ****/
const NewBooking = props => {
  // STATE VARIABLES
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formIsHidden, setFormIsHidden] = useState(true);

  // EVENT HANDLERS
  const sendBookingData = bookingData => {
    // add order number to
    props.newBooking(bookingData);
    setFormData(INITIAL_FORM_DATA);
    setFormIsHidden(true);
  };

  const showBookingForm = () => setFormIsHidden(false);

  return formIsHidden ? (
    <Button
      id="New Booking"
      caption="New Booking"
      onClickHandler={showBookingForm}
    />
  ) : (
    <div className="new-booking">
      <div className="page-header">
        <h4 className="text-left">Add New Booking</h4>
      </div>
      <Form id="form-1" fields={formData} onSubmitHandler={sendBookingData} />
    </div>
  );
};
export default NewBooking;
