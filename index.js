const form = document.querySelector(".form");
const formSubmited = document.querySelector(".form__submited");
const formWrapper = document.querySelectorAll(".form__wrapper");
const cardNumber = document.querySelector(".card__number");
const cardHolderName = document.querySelector(".card__name");
const cardMonthExpires = document.querySelector(".card__expires-month");
const cardYearExpires = document.querySelector(".card__expires-year");
const cardCvc = document.querySelector(".card__cvc");
const InputcardHolder = document.querySelector("#cardholder");
const inputCardNum = document.querySelector("#cardnum");
const inputCvc = document.querySelector("#cardcvc");
const inputMonth = document.querySelector("#cardmonth");
const inputYear = document.querySelector("#cardyear");
const btnContinue = document.querySelector(".btn__continue");
const btnReturn = document.querySelector(".btn__return");

// CLEAVE LIBRARY TO FORMAT THE INPUTS
const cleaveCardNum = new Cleave("#cardnum", {
  creditCard: true,
});
const cleaveMonth = new Cleave("#cardmonth", {
  date: true,
  datePattern: ["m"],
});
const cleaveYear = new Cleave("#cardyear", {
  date: true,
  datePattern: ["y"],
});
const cleaveCvc = new Cleave("#cardcvc", {
  numericOnly: true,
  blocks: [3],
});

// Condition function to check if the string contains number
const containsNumber = function (str) {
  return /[0-9]/.test(str);
};

// HANDLERS
inputCardNum.addEventListener("input", function () {
  // UI Update
  cardNumber.textContent = this.value;
  // Return to inital values if field is empty
  if (this.value === "") cardNumber.textContent = "0111 2002 0111 2026";
  // Unshow error message if field is not empty
  else {
    this.nextElementSibling.style.opacity = 0;
    this.classList.remove("form__input-error");
  }
});
inputCvc.addEventListener("input", function () {
  // UI Update
  cardCvc.textContent = this.value;
  // Return to inital values if field is empty
  if (this.value === "") cardCvc.textContent = "111";
  // Unshow error message if field is not empty
  if (this.value !== "") {
    this.nextElementSibling.style.opacity = 0;

    this.classList.remove("form__input-error");
  }
});
inputMonth.addEventListener("input", function () {
  // UI Update
  cardMonthExpires.textContent = this.value;
  // Return to inital values if field is empty
  if (this.value === "") cardMonthExpires.textContent = "01";
  if (this.value !== "") {
    document.querySelector(
      ".form__inputs"
    ).nextElementSibling.style.opacity = 0;
    this.classList.remove("form__input-error");
  }
});
inputYear.addEventListener("input", function () {
  // UI Update
  cardYearExpires.textContent = this.value;
  // Return to inital values if field is empty
  if (this.value === "") cardYearExpires.textContent = "11";
  // Unshow error message if field is not empty
  if (this.value !== "") {
    document.querySelector(
      ".form__inputs"
    ).nextElementSibling.style.opacity = 0;
    this.classList.remove("form__input-error");
  }
});
InputcardHolder.addEventListener("input", function () {
  // UI Update
  cardHolderName.textContent = this.value;

  // Reset value
  if (this.value === "") cardHolderName.textContent = "Jane Appaulesd";
  // Unshow error message if field is not empty and doesn't contains number
  if (this.value !== "") {
    this.nextElementSibling.style.opacity = 0;
    this.nextElementSibling.textContent = "Can't be blank";
    this.classList.remove("form__input-error");
  }

  // Show error if the nameholder value inputed contains number
  if (containsNumber(this.value)) {
    this.nextElementSibling.textContent = "Name can't contain numbers.";
    this.nextElementSibling.style.opacity = 1;
  }
});

btnContinue.addEventListener("click", function (e) {
  e.preventDefault();

  // Showing "Error message if fields are empty" after click on continue
  if (inputMonth.value === "" || inputYear.value === "") {
    document.querySelector(
      ".form__inputs"
    ).nextElementSibling.style.opacity = 1;
  }
  if (inputMonth.value === "") {
    inputMonth.classList.add("form__input-error");
  }
  if (inputYear.value === "") {
    inputYear.classList.add("form__input-error");
  }
  if (InputcardHolder.value === "") {
    InputcardHolder.classList.add("form__input-error");
    InputcardHolder.nextElementSibling.style.opacity = 1;
  }
  if (inputCvc.value === "") {
    inputCvc.classList.add("form__input-error");
    inputCvc.nextElementSibling.style.opacity = 1;
  }
  if (inputCardNum.value === "") {
    inputCardNum.classList.add("form__input-error");
    inputCardNum.nextElementSibling.style.opacity = 1;
  }

  // Check if card number is 16 digits long and shows error if not
  if (inputCardNum.value.length < 19 && inputCardNum.value.length > 0) {
    inputCardNum.classList.add("form__input-error");
    inputCardNum.nextElementSibling.style.opacity = 1;
    inputCardNum.nextElementSibling.textContent =
      "Wrong Card Number! Card number is 16 digits.";
  }
  // Guard condition to not execute what follows this close
  if (
    inputMonth.value === "" ||
    inputYear.value === "" ||
    inputCardNum.value === "" ||
    inputCvc.value === "" ||
    InputcardHolder.value === ""
  )
    return;
  if (containsNumber(InputcardHolder.value)) {
    InputcardHolder.nextElementSibling.textContent =
      "Name can't contain numbers.";
    InputcardHolder.nextElementSibling.style.opacity = 1;
    return;
  }

  // Adding animation to hide form and show final phase
  formWrapper.forEach(
    (wrapper) =>
      (wrapper.style.animation =
        "hideForm 1s forwards, showForm 1s 2.25s forwards")
  );

  // Remove form and Showing the final phase while animation works
  setTimeout(function () {
    form.style.display = "none";
    formSubmited.style.display = "flex";
  }, 1500);

  // Removing the animation from wrappers
  setTimeout(function () {
    formWrapper.forEach((wrapper) => (wrapper.style.animation = ""));
  }, 3500);
});

btnReturn.addEventListener("click", function () {
  // Adding animation to hide form and show final phase
  formWrapper.forEach(
    (wrapper) =>
      (wrapper.style.animation =
        "hideForm 1s forwards, showForm 1s 2.25s forwards")
  );

  // Remove form and Showing the final phase while animation works
  setTimeout(function () {
    form.style.display = "flex";
    formSubmited.style.display = "none";
  }, 1500);

  // Initialazitaion on return
  inputMonth.value = "";
  inputYear.value = "";
  inputCardNum.value = "";
  inputCvc.value = "";
  InputcardHolder.value = "";
  cardNumber.textContent = "0111 2002 0111 2026";
  cardCvc.textContent = "111";
  cardMonthExpires.textContent = "01";
  cardYearExpires.textContent = "11";
  cardHolderName.textContent = "Jane Appaulesd";

  // Removing the animation from wrappers
  setTimeout(function () {
    formWrapper.forEach((wrapper) => (wrapper.style.animation = ""));
  }, 3500);
});
