import React, { useState } from "react";

const [day, month, year] = new Date().toLocaleDateString("en-GB").split("/");
const TODAY = [year, month, day].join("-");

const NewBooking = props => {
  // console.log(props.today)
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState(TODAY);
  const [checkOutDate, setCheckOutDate] = useState(TODAY);
  const [buttonCaption, setButtonCaption] = useState("New Booking");
  const [errors, setErrors] = useState([]);

  const changeTitle = newTitle => {
    setTitle(newTitle);
  };
  const collectBookingData = event => {
    event.preventDefault();
    const bookingData = {
      id: props.id + 1,
      title: title,
      firstName: firstName,
      surname: surname,
      roomId: roomId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate
    };
    const errors = validateForm(event.target);
    if (!errors.length) {
      resetForm();
      return props.newBooking(bookingData);
    }
    setErrors(errors);
  };

  const changeButton = event => {
    event.preventDefault();
    setCheckInDate(TODAY);
    setCheckOutDate(TODAY);
    setButtonCaption("Book");
  };

  const resetForm = () => {
    setTitle("");
    setFirstName("");
    setSurname("");
    setEmail("");
    setRoomId("");
    setCheckInDate("");
    setCheckOutDate("");
    setButtonCaption("New Booking");
  };

  if (buttonCaption === "New Booking") {
    return (
      <div className="form-group">
        <button
          id="New Booking"
          className="btn btn-primary"
          onClick={changeButton}
        >
          {buttonCaption}
        </button>
      </div>
    );
  }
  return (
    <div className="new-booking">
      <div className="page-header">
        <h4 className="text-left">Add New Booking</h4>
      </div>
      <Errors errors={errors} />
      <form id="form-1" className="form-group" onSubmit={collectBookingData}>
        <div className="form-group customer-info">
          <Titles onChange={changeTitle} />
          <input
            id="First Name"
            type="text"
            className="form-control"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            placeholder="First Name"
          />
          <input
            id="Surname"
            type="text"
            className="form-control"
            value={surname}
            onChange={event => setSurname(event.target.value)}
            placeholder="Surname"
          />
          <input
            id="Email"
            type="email"
            className="form-control"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group hotel-info">
          <input
            id="Room ID"
            type="number"
            className="form-control"
            min={1}
            value={roomId}
            onChange={event => setRoomId(event.target.value)}
            placeholder="Room ID"
          />
          <input
            id="Checkin date"
            type="date"
            className="form-control"
            min={checkInDate}
            value={checkInDate}
            onChange={event => setCheckInDate(event.target.value)}
          />
          <input
            id="Checkout date"
            type="date"
            className="form-control"
            min={checkInDate}
            value={checkOutDate}
            onChange={event => setCheckOutDate(event.target.value)}
          />
          <button id="Book" className="form-control btn btn-primary">
            {buttonCaption}
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewBooking;

function validateForm(form) {
  const fileds = [...form.querySelectorAll("input")];
  return fileds
    .filter(input => input.value === "")
    .map(input => `${input.id} cannot be empty.`);
}

export const Errors = ({ errors }) => {
  return (
    <div>
      {errors.map((error, index) => (
        <p key={index} style={{ color: "red" }}>
          {error}
        </p>
      ))}
    </div>
  );
};

export const Titles = props => {
  return (
    <select
      id="Title"
      className="form-control"
      onChange={event => props.onChange(event.target.value)}
      placeholder="Title"
    >
      <option value="">Title</option>
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
      <option value="Miss">Miss</option>
    </select>
  );
};
