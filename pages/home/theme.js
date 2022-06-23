const themeBtn = document.getElementById("theme-btn");
const body = document.getElementsByTagName("body")[0];

themeBtn.addEventListener("click", handleTheme);

function handleTheme() {
  if (body.classList.contains("theme--dark")) {
    themeBtn.classList.remove("theme-active");
    themeBtn.classList.add("theme-disable");
    body.classList.remove("theme--dark");
    body.classList.add("theme");
  } else if (body.classList.contains("theme")) {
    themeBtn.classList.add("theme-active");
    themeBtn.classList.remove("theme-disable");
    body.classList.remove("theme");
    body.classList.add("theme--dark");
  }
}
