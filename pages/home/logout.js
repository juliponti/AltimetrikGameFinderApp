const logoutBtn = document.getElementById("logout-btn");
const menuLogoutBtn = document.getElementById("menu-logout-btn");

const logOut = (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("picture");
  window.location.replace("../login/index.html");
};

logoutBtn.addEventListener("click", logOut);
menuLogoutBtn.addEventListener("click", logOut);
