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
  return fileds
    .filter(input => input.value === "")
    .map(input => `${input.id} cannot be empty.`);
}

export function getFormData(form, bookingId) {
  // collect text input fields values and put them in a list
  const dataList = [...form.querySelectorAll("input")].map(
    input => input.value
  );
  // add the customer's title to the above list
  dataList.unshift(form.querySelector("select").value);
  // turn the collected list into a usable form (i.e., object)
  const formData = {
    id: bookingId,
    title: dataList[0],
    firstName: dataList[1],
    surname: dataList[2],
    email: dataList[3],
    roomId: dataList[4],
    checkInDate: dataList[5],
    checkOutDate: dataList[6]
  };
  return formData;
}
