export const snackbar = (message) => {
  const snackbar = document.getElementById("snackbar");

  snackbar.classList.add("show");
  snackbar.innerHTML = message;

  setTimeout(() => {
    snackbar.classList.remove("show");
    snackbar.innerHTML = "";
  }, 3000);
};

export const showError = (input, id, message) => {
  const error = document.getElementById(`error-${id}`);

  input.classList.remove("success");
  input.classList.add("error");
  error.classList.add("error-message");

  error.textContent = message;
};

export const showSuccess = (input, id) => {
  const error = document.getElementById(`error-${id}`);

  input.classList.remove("error");
  input.classList.add("success");
  error.classList.remove("error-message");
  error.textContent = "";
};
