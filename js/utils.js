export const snackbar = (message) => {
  const snackbar = document.getElementById("snackbar");

  snackbar.classList.add("show");
  snackbar.innerHTML = message;

  setTimeout(() => {
    snackbar.classList.remove("show");
    snackbar.innerHTML = "";
  }, 3000);
};
