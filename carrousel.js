const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");

const themeBtnLogin = document.getElementById("theme-btn-login");
const body = document.getElementsByTagName("body")[0];

themeBtnLogin.addEventListener("click", handleTheme);

window.addEventListener("load", getActiveTheme);

function getActiveTheme() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      event.matches ? handleDarkTheme() : handleLightTheme();
    });
}

let i = 0;

const imagesDark = [];
const imagesLight = [];

let themeImg = imagesDark;

imagesDark[0] = "../../assets/desktop/slider/slide-1.png";
imagesDark[1] = "../../assets/desktop/slider/slide-2.jpg";
imagesDark[2] = "../../assets/desktop/slider/slide-3.jpg";
imagesDark[3] = "../../assets/desktop/slider/slide-4.jpg";
imagesDark[4] = "../../assets/desktop/slider/slide-5.jpg";
imagesDark[5] = "../../assets/desktop/slider/slide-6.jpg";

imagesLight[0] = "../../assets/desktop/slider/lightMode/slide-light-1.png";
imagesLight[1] = "../../assets/desktop/slider/lightMode/slide-light-2.jpg";
imagesLight[2] = "../../assets/desktop/slider/lightMode/slide-light-3.jpg";
imagesLight[3] = "../../assets/desktop/slider/lightMode/slide-light-4.jpg";
imagesLight[4] = "../../assets/desktop/slider/lightMode/slide-light-5.jpg";
imagesLight[5] = "../../assets/desktop/slider/lightMode/slide-light-6.jpg";

function handleLightTheme() {
  themeImg = imagesLight;
  body.style.backgroundImage = `url("${imagesLight[i]}")`;
  themeBtnLogin.classList.remove("theme-active");
  themeBtnLogin.classList.add("theme-disable");
  body.classList.remove("theme--dark");
  body.classList.add("theme");
}

function handleDarkTheme() {
  body.style.backgroundImage = `url("${imagesDark[i]}")`;
  themeImg = imagesDark;
  themeBtnLogin.classList.add("theme-active");
  themeBtnLogin.classList.remove("theme-disable");
  body.classList.remove("theme");
  body.classList.add("theme--dark");
}

function handleTheme() {
  if (body.classList.contains("theme--dark")) {
    handleLightTheme();
  } else if (body.classList.contains("theme")) {
    handleDarkTheme();
  }
}

function prevPicture() {
  if (i === 0) {
    i = 6;
    document.getElementById(`bullet-${i - 1}`).style.opacity = "1";
    document.getElementById(`bullet-0`).style.opacity = "0.25";
    i--;
    body.style.backgroundImage = `url("${themeImg[i]}")`;
  } else if (i <= 5) {
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    i--;
    body.style.backgroundImage = `url("${themeImg[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    document.getElementById(`bullet-${i + 1}`).style.opacity = "0.25";
  }
}

function nextPicture() {
  if (i <= 4) {
    i++;
    document.body.style.backgroundImage = `url("${themeImg[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    document.getElementById(`bullet-${i - 1}`).style.opacity = "0.25";
  } else if (i == 5) {
    document.getElementById(`bullet-${i}`).style.opacity = "0.25";
    i = 0;
    document.body.style.backgroundImage = `url("${themeImg[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
  }
}

prevArrow.addEventListener("click", prevPicture);
nextArrow.addEventListener("click", nextPicture);
