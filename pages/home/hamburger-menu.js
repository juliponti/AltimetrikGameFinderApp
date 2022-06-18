const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("hamburger-menu");
const cross = document.getElementById("close-icon");

hamburger.addEventListener("click", () => {
  menu.classList.add("menu-active");
  menu.classList.remove("menu-disable");
});

cross.addEventListener("click", () => {
  menu.classList.add("menu-disable");
  menu.classList.remove("menu-active");
});
