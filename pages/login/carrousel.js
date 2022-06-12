const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");

prevArrow.addEventListener("click", prevPicture);
nextArrow.addEventListener("click", nextPicture);

let i = 0;
const images = [];

images[0] = "../../assets/desktop/slider/slide-1.png";
images[1] = "../../assets/desktop/slider/slide-2.jpg";
images[2] = "../../assets/desktop/slider/slide-3.jpg";
images[3] = "../../assets/desktop/slider/slide-4.jpg";
images[4] = "../../assets/desktop/slider/slide-5.jpg";
images[5] = "../../assets/desktop/slider/slide-6.jpg";

function prevPicture() {
  if (i == 0) {
    i = 6;
    document.getElementById(`bullet-${i - 1}`).style.opacity = "1";
    document.getElementById(`bullet-0`).style.opacity = "0.25";
    i--;
    document.body.style.backgroundImage = `url("${images[i]}")`;
  } else if (i <= 5) {
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    i--;
    document.body.style.backgroundImage = `url("${images[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    document.getElementById(`bullet-${i + 1}`).style.opacity = "0.25";
  }
}

function nextPicture() {
  if (i <= 4) {
    i++;
    document.body.style.backgroundImage = `url("${images[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
    document.getElementById(`bullet-${i - 1}`).style.opacity = "0.25";
  } else if (i == 5) {
    document.getElementById(`bullet-${i}`).style.opacity = "0.25";
    i = 0;
    document.body.style.backgroundImage = `url("${images[i]}")`;
    document.getElementById(`bullet-${i}`).style.opacity = "1";
  }
}
