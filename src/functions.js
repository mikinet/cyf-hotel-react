import { validate } from "email-validator";
// SUPPLEMENTARY FUNCTION DEFINITIONS

export const filterData = (bookingDetails, userInput) => {
  return bookingDetails.filter(customer => {
    // make sure the search is not case-sensitive
    const firstName = customer.firstName.toUpperCase();
    const surname = customer.surname.toUpperCase();
    const value = userInput.toUpperCase();
    return firstName.includes(value) || surname.includes(value);
  });
};

export function validateForm(form) {
  const fileds = [...form.querySelectorAll("input")];
  const errors = fileds
    .filter(input => input.value === "")
    .map(input => `${input.id} cannot be empty.`);
  const email = document.getElementById("Email").value;
  const emailIsValid = validate(email);
  if (email !== "" && !emailIsValid) {
    errors.push("Please enter a valid email address.");
  }
  return errors;
}

export function getFormData(form) {
  // collect text input fields values and put them in a list
  const dataList = [...form.querySelectorAll("input")].map(
    input => input.value
  );
  // add the customer's title to the above list
  dataList.unshift(form.querySelector("select").value);
  // turn the collected list into a usable form (i.e., object)
  const formData = {
    title: dataList[0],
    firstName: dataList[1],
    surname: dataList[2],
    email: dataList[3],
    roomId: parseInt(dataList[4]),
    checkInDate: dataList[5],
    checkOutDate: dataList[6]
  };
  return formData;
}

export function createNewBooking(bookingData, url) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(bookingData),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function getTheNextDayDate(currentDateValue) {
  const currentDate = new Date(currentDateValue);
  const nextDay = currentDate.setDate(currentDate.getDate() + 1);
  const [day, month, year] = new Date(nextDay)
    .toLocaleDateString("en-GB")
    .split("/");
  return [year, month, day].join("-");
}
