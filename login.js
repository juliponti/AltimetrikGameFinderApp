import { snackbar, showError, showSuccess } from "./utils.js";

// Form validation

const inputEmail = document.getElementById("input-email");
const inputPsw = document.getElementById("input-psw");
const form = document.getElementById("form");
const pswIcon = document.getElementsByClassName("psw-eye");
const iconContainer = document.getElementsByClassName("icon__container")[0];

const checkbox = document.getElementById("checkbox");
const tick = document.getElementsByClassName("checkbox__vector")[0];

// password view

iconContainer.addEventListener("click", handleClick);

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

// Remember me

checkbox.addEventListener("click", handleRemember);
tick.addEventListener("click", handleRemember);

function handleRemember() {
  if (checkbox.classList.contains("checkbox--active")) {
    checkbox.classList.remove("checkbox--active");
    tick.style.display = "none";
  } else {
    checkbox.classList.add("checkbox--active");
    tick.style.display = "block";
  }
}

// inputs Validation

const isRequired = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
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

function checkEmail() {
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
}

function checkPassword() {
  let valid = false;

  const password = inputPsw.value.trim();

  if (!isRequired(password)) {
    showError(inputPsw, 2, "Password cannot be blank");
    iconContainer.removeEventListener;
    iconContainer.style.bottom = "48px";
    iconContainer.style.cursor = "no-drop";
    pswIcon[0].style.fill = "#FB5F5F";
    pswIcon[1].style.fill = "#FB5F5F";
  } else {
    showSuccess(inputPsw, 2);
    iconContainer.style.bottom = "25px";
    iconContainer.style.cursor = "pointer";
    pswIcon[0].style.fill = "#36B972";
    pswIcon[1].style.fill = "#36B972";
    valid = true;
  }

  return valid;
}

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
      picture: true | false,
    }),
  });
  if (!rawResponse.ok) {
    const message = await rawResponse.json();
    snackbar(message);
  }
  const content = await rawResponse.json();
  localStorage.setItem("user", content.user.email);
  localStorage.setItem("token", content.accessToken);
  localStorage.setItem("picture", content.user.picture);
  window.location.replace("./pages/home/index.html");
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();

  let isFormValid = isEmailValid && isPasswordValid;

  if (isFormValid) {
    login();
  }
});
