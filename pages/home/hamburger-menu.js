import { trapFocus } from "./utils.js";

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("hamburger-menu");
const cross = document.getElementById("close-icon");
const searchIcon = document.getElementById("mobile-search-icon");
const search = document.getElementById("search-container");
const userImg = document.getElementById("hamburger-user-img");

hamburger.addEventListener("click", () => {
  menu.classList.add("menu-active");
  menu.classList.remove("menu-disable");

  trapFocus(menu, true);
});

cross.addEventListener("click", () => {
  menu.classList.add("menu-disable");
  menu.classList.remove("menu-active");
  trapFocus(menu, false);
});

searchIcon.addEventListener("click", () => {
  search.classList.toggle("search-active");
});

if (localStorage.getItem("picture") == "true") {
  userImg.style.backgroundImage = `url("../../assets/tablet/home/menu/Custom.png")`;
} else {
  userImg.style.backgroundImage = `url("../../assets/tablet/home/menu/EmptyState.png")`;
}
