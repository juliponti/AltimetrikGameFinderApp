import { snackbar } from "./js/utils.js";

// Carousel

const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");

let i = 0;
const images = [];

images[0] = "./assets/desktop/slider/slide-1.png";
images[1] = "./assets/desktop/slider/slide-2.jpg";
images[2] = "./assets/desktop/slider/slide-3.jpg";
images[3] = "./assets/desktop/slider/slide-4.jpg";
images[4] = "./assets/desktop/slider/slide-5.jpg";
images[5] = "./assets/desktop/slider/slide-6.jpg";

function prevPicture() {
  if (i == 0) {
    i = 6;
    document.getElementById(`bullet-${i - 1}`).style.opacity = "1";
    document.getElementById(`bullet-0`).style.opacity = "0.25";
    i--;
    document.body.style.backgroundImage = `url("${images[i]}")`;
  } else if (i <= 5) {
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    i--;
    document.body.style.backgroundImage = `url("${images[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    document.getElementById(`bullet-${i + 1}`).style.opacity = "0.25";
  }
}

function nextPicture() {
  if (i <= 4) {
    i++;
    document.body.style.backgroundImage = `url("${images[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    document.getElementById(`bullet-${i - 1}`).style.opacity = "0.25";
  } else if (i == 5) {
    document.getElementById(`bullet-${i}`).style.opacity = "0.25";
    i = 0;
    document.body.style.backgroundImage = `url("${images[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
  }
}

prevArrow.addEventListener("click", prevPicture);
nextArrow.addEventListener("click", nextPicture);

// Form validation

const inputEmail = document.getElementById("input-email");
const inputPsw = document.getElementById("input-psw");
const form = document.getElementById("form");
const pswIcon = document.getElementsByClassName("psw-eye");
const iconContainer = document.getElementsByClassName("icon__container")[0];

const checkbox = document.getElementById("checkbox");
const tick = document.getElementsByClassName("checkbox__vector")[0];

// password view

function handleClick() {
  const eye = document.getElementsByClassName("icon--inactive")[0];
  const crossEye = document.getElementsByClassName("icon--active")[0];

  if (inputPsw.value != "" && inputPsw.type === "password") {
    inputPsw.type = "text";
    eye.style.display = "none";
    crossEye.style.display = "block";
    inputPsw.classList.remove("dots");
  } else if (inputPsw.value != "" && inputPsw.type === "text") {
    inputPsw.type = "password";
    inputPsw.classList.add("dots");
    eye.style.display = "block";
    crossEye.style.display = "none";
  }
}

iconContainer.addEventListener("click", handleClick);

// Remember me

function handleRemember() {
  if (checkbox.classList.contains("checkbox--active")) {
    checkbox.classList.remove("checkbox--active");
    tick.style.display = "none";
  } else {
    checkbox.classList.add("checkbox--active");
    tick.style.display = "block";
  }
}

checkbox.addEventListener("click", handleRemember);
tick.addEventListener("click", handleRemember);

// utils

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, id, message) => {
  const error = document.getElementById(`error-${id}`);

  input.classList.remove("success");
  input.classList.add("error");
  error.classList.add("error-message");

  error.textContent = message;
};

const showSuccess = (input, id) => {
  const error = document.getElementById(`error-${id}`);

  input.classList.remove("error");
  input.classList.add("success");
  error.classList.remove("error-message");
  error.textContent = "";
};

// inputs Validation

const checkEmail = () => {
  let valid = false;
  const email = inputEmail.value.trim();

  if (!isRequired(email)) {
    showError(inputEmail, 1, "Email cannot be blank");
  } else if (!isEmailValid(email)) {
    showError(inputEmail, 1, "Email is not valid");
  } else {
    showSuccess(inputEmail, 1);
    valid = true;
  }

  return valid;
};

const checkPassword = () => {
  let valid = false;
  const min = 5,
    max = 10;
  const password = inputPsw.value.trim();

  if (!isRequired(password)) {
    showError(inputPsw, 2, "Password cannot be blank");
    iconContainer.removeEventListener;
    iconContainer.style.bottom = "48px";
    iconContainer.style.cursor = "no-drop";
    pswIcon[0].style.fill = "#FB5F5F";
    pswIcon[1].style.fill = "#FB5F5F";
  } else if (!isBetween(password.length, min, max)) {
    iconContainer.style.bottom = "46px";
    showError(
      inputPsw,
      2,
      `Password must be between  ${min} and ${max} characters`
    );
  } else {
    showSuccess(inputPsw, 2);
    iconContainer.style.bottom = "25px";
    iconContainer.style.cursor = "pointer";
    pswIcon[0].style.fill = "#36B972";
    pswIcon[1].style.fill = "#36B972";
    valid = true;
  }

  return valid;
};

form.addEventListener("input", function (e) {
  switch (e.target.id) {
    case "input-email":
      checkEmail();
      break;
    case "input-psw":
      checkPassword();
      break;
  }
});

const login = async () => {
  const rawResponse = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inputEmail.value,
      password: inputPsw.value,
    }),
  });
  if (!rawResponse.ok) {
    const message = await rawResponse.json();
    snackbar(message);
    inputEmail.value = "";
    inputPsw.value = "";
  }
  const content = await rawResponse.json();
  console.log(content);
  localStorage.setItem("user", content.user.email);
  localStorage.setItem("token", content.accessToken);
  window.location.replace("./pages/home/index.html");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();

  let isFormValid = isEmailValid && isPasswordValid;

  if (isFormValid) {
    if (checkbox.classList.contains("checkbox--active")) {
      login().catch((error) => {
        console.log(error);
      });
    } else {
      login().catch((error) => {
        console.log(error);
      });
    }
  }
});
