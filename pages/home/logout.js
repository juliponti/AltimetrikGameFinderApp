const logoutBtn = document.getElementById("logout-btn");
const menuLogoutBtn = document.getElementById("menu-logout-btn");

logoutBtn.addEventListener("click", logOut);
menuLogoutBtn.addEventListener("click", logOut);

function logOut(e) {
  e.preventDefault();
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("picture");
  window.location.replace("../../index.html");
}
