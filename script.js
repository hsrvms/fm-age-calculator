const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
  calculateAge();
});

function calculateAge() {
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  let currentYear = new Date().getFullYear();

  hideError("day");
  hideError("month");
  hideError("year");

  if (day === "") {
    showError("day", "This field is required");
  } else if (day < 1 || day > 31) {
    showError("day", "Must be a valid day");
  }

  if (month === "") {
    showError("month", "This field is required");
  } else if (month < 1 || month > 12) {
    showError("month", "Must be a valid month");
  }

  if (year === "") {
    showError("year", "This field is required");
  } else if (year < 1900 || year > currentYear) {
    showError("year", "Must be a valid year");
  }

  console.log(hasErrors());

  if (!hasErrors()) {
    const yearBox = document.getElementById("year-box");
    const monthBox = document.getElementById("month-box");
    const dayBox = document.getElementById("day-box");

    const yearSpan = yearBox.getElementsByTagName("span")[0];
    const monthSpan = monthBox.getElementsByTagName("span")[0];
    const daySpan = dayBox.getElementsByTagName("span")[0];

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    const ageInMS = currentDate - birthDate;
    const ageDate = new Date(ageInMS);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    yearSpan.innerHTML = years;
    monthSpan.innerHTML = months;
    daySpan.innerHTML = days;
  }
}

function showError(fieldId, message) {
  const errorEl = document.getElementById("error-" + fieldId);
  const errorLabel = document.querySelector('label[for="' + fieldId + '"]');
  const errorInput = document.getElementById(fieldId);

  errorEl.innerHTML = message;
  errorEl.classList.remove("hidden");
  errorLabel.classList.add("error-label");
  errorInput.classList.add("error-border");
}

function hideError(fieldId) {
  const errorEl = document.getElementById("error-" + fieldId);
  const errorLabel = document.querySelector('label[for="' + fieldId + '"]');
  const errorInput = document.getElementById(fieldId);

  errorEl.classList.add("hidden");
  errorLabel.classList.remove("error-label");
  errorInput.classList.remove("error-border");
}

function hasErrors() {
  const errors = document.querySelectorAll(".error-border");
  console.log(errors);
  return errors.length;
}
