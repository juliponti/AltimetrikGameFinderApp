const input = document.getElementById("home-input");
const body = document.getElementsByTagName("body")[0];

input.addEventListener("focus", () => {
  body.classList.add("dark");
});

input.addEventListener("blur", () => {
  body.classList.remove("dark");
});
