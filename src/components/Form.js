import React, { useState } from "react";
import { getFormData, validateForm } from "../functions";

// COMPONENT DEFINITION
const Form = props => {
  // PREPARATIONS
  const fields = props.fields;
  const [errors, setErrors] = useState([]);

  // EVENT HANDLERS
  const submitFormData = event => {
    const form = event.target;
    event.preventDefault();
    const errorsMessages = validateForm(form);
    if (errorsMessages.length === 0) {
      setErrors([]);
      const data = getFormData(form, fields.id + 1);
      props.onSubmitHandler(data);
      form.reset();
    }
    setErrors(errorsMessages);
  };

  const changeCheckoutDateMinValue = minDateValue => {
    document.getElementById("checkoutDate").min = minDateValue;
  };

  return (
    <form id={props.id} className="form-group" onSubmit={submitFormData}>
      <Errors errors={errors} />
      <div className="form-group customer-info">
        <SelectorBox properties={fields.titles} />
        <TextBox properties={fields.firstName} />
        <TextBox properties={fields.surname} />
        <TextBox properties={fields.email} />
      </div>
      <div className="form-group hotel-info">
        <NumberBox properties={fields.roomId} />
        <DatePicker
          properties={fields.checkinDate}
          onChangeHandler={changeCheckoutDateMinValue}
        />
        <DatePicker properties={fields.checkoutDate} />
        <Button properties={fields.button} />
      </div>
    </form>
  );
};
export default Form;

const Errors = ({ errors }) => {
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

/********* FORM CONTROLS */

export const TextBox = ({ properties }) => {
  const [inputValue, setInputValue] = useState(properties.value);
  return (
    <input
      id={properties.id}
      type="text"
      className="form-control"
      value={inputValue}
      onChange={event => setInputValue(event.target.value)}
      placeholder={properties.placeholder}
    />
  );
};

export const NumberBox = ({ properties }) => {
  const [inputValue, setInputValue] = useState(properties.value);
  return (
    <input
      id={properties.id}
      type="number"
      className="form-control"
      min={properties.min}
      value={inputValue}
      onChange={event => setInputValue(event.target.value)}
    />
  );
};

export const DatePicker = ({ properties, onChangeHandler }) => {
  const [inputValue, setInputValue] = useState(properties.value);
  return (
    <input
      id={properties.id}
      type="date"
      className="form-control"
      min={properties.min}
      value={inputValue}
      onChange={event => {
        setInputValue(event.target.value);
        onChangeHandler(event.target.value);
      }}
    />
  );
};

export const Button = ({ properties }) => {
  return (
    <button id={properties.id} className="form-control btn btn-primary">
      {properties.caption}
    </button>
  );
};

export const SelectorBox = ({ properties }) => {
  const [inputValue, setInputValue] = useState(properties.value);
  return (
    <select
      id={properties.id}
      className="form-control"
      onChange={event => setInputValue(event.target.value)}
      placeholder={properties.placeholder}
      value={inputValue}
    >
      {properties.options.map((option, index) => {
        return (
          <option key={index} value={option.value}>
            {option.placeholder}
          </option>
        );
      })}
    </select>
  );
};
