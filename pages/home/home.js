import {
  debounce,
  optionButton,
  displayLoading,
  hideLoading,
  months,
  platformsImg,
  cardsDisplay,
} from "./utils.js";

const apiKey = "key=4d05faf97f714c34975ad9634c84fb4d";

// header
const input = document.getElementById("home-input");
const cross = document.getElementById("cross");
const layer = document.getElementById("layer");
const userImg = document.getElementById("user-img-container");

//  banner
const optionsContainer = document.getElementById("options-cont");
const threeCardVwBtn = document.getElementById("three-card-view-btn");
const threeVwIcon = document.getElementById("three-vw-icon");
const oneVwIcon = document.getElementById("one-vw-icon");
const oneCardVwBtn = document.getElementById("one-card-view-btn");

// primary-section
const gallery = document.getElementById("gallery");
const cardContainer = document.getElementById("cards-container");
const notFoundText = document.getElementById("not-found");
const gamesUrl = `https://api.rawg.io/api/games?${apiKey}&page=1`;

//modal
const modalRoot = document.getElementById("modal-root");
const modalDoc = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-cross-btn");

// aside
const lastSearches = document.getElementById("last-searches");
const homeText = document.getElementById("home-text");
const menuHomeText = document.getElementById("menu-home-text");

let counter = 0;
let currentValue;

let threeViewVal;
let oneViewVal;

let lastResults = [];
let nextPage;
let modalBg;

let observer = new IntersectionObserver(
  (entry) => {
    entry.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        onLoad(nextPage);
        isLoading = true;
      }
    });
  },
  {
    rootMargin: "0px 0px 0px 0px",
    threshhold: 1.0,
  }
);

window.addEventListener("click", () => {
  optionsContainer.innerHTML = "";
});

input.addEventListener("keypress", debounce(handleChange, 350));
input.addEventListener("focus", () => {
  layer.style.display = "block";
});
input.addEventListener("blur", () => {
  layer.style.display = "none";
});
cross.addEventListener("click", () => {
  input.value = "";
  cross.style.visibility = "hidden";
});

threeCardVwBtn.addEventListener("click", handleThreeView);
oneCardVwBtn.addEventListener("click", handleOneView);

homeText.addEventListener("click", handleHomeText);
homeText.addEventListener("keypress", handleHomeText);
menuHomeText.addEventListener("click", handleHomeText);
lastSearches.addEventListener("click", handleLastSearches);
lastSearches.addEventListener("keypress", handleLastSearches);

closeBtn?.addEventListener("click", () => {
  modalRoot.classList.remove("visible");
});
modalRoot.addEventListener("click", () => {
  modalRoot.classList.remove("visible");
});

// adds a profile pic if there is one or the initials if there isn't

if (localStorage.getItem("picture") == "true") {
  userImg.style.backgroundImage = `url("../../assets/desktop/home/header/Custom.png")`;
} else {
  userImg.style.backgroundImage = `url("../../assets/desktop/home/header/EmptyState.png")`;
}

// card view in three columns active by default

threeViewVal = true;
oneViewVal = false;

let gameData;
let movies;
let favorite;
let title;
let searchData;
let isLoading = false;
const bgDefault = "../../assets/desktop/home/card/bg-default.jpg";

// Cards component

function getDescription(gameData) {
  let completeGameData;
  const promises = [];

  gameData.forEach((game) => {
    const gameId = game.id;

    const gameFetch = fetch(
      `https://api.rawg.io/api/games/${gameId}?${apiKey}&`
    )
      .then((res) => res.json())
      .then((data) => {
        completeGameData = Object.assign(game, data, movies);

        return completeGameData;
      });

    promises.push(gameFetch);
  });

  return Promise.all(promises);
}

const card = (page) =>
  page.map((result) => {
    let genreTitle = "";
    let consoles = [];
    let date = result.released;

    const genres = result.genres;
    const parentPlatforms = result.parent_platforms;

    date = date.split("-");
    const month = date[1];
    const currentMonth = months[month];
    const formatDayStr = `${currentMonth} ${date[2]}, ${date[0]}`;

    counter = counter + 1;

    genres.forEach((genre) => {
      genreTitle += `${genre.name}, `;
    });

    parentPlatforms.forEach((platform) => {
      const id = platform.platform.id;
      consoles.push(platformsImg[id]);
    });

    return `<button class=${
      threeViewVal ? "home__main__card" : "one-card-view__card"
    } aria-label="game card">
          <div>
                 <img src="${result.background_image || bgDefault}" alt="${
      result.name
    }"/>
           <svg class="favorite" width="22" height="21" viewBox="0 0 22 21" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33301 3.33342C4.47967 3.33342 2.99967 4.81742 2.99967 6.62275C2.99967 8.65475 4.17567 10.8228 5.99434 12.9468C7.52234 14.7294 9.37834 16.3374 10.9997 17.6348C12.621 16.3374 14.477 14.7281 16.005 12.9468C17.8237 10.8228 18.9997 8.65342 18.9997 6.62275C18.9997 4.81742 17.5197 3.33342 15.6663 3.33342C13.813 3.33342 12.333 4.81742 12.333 6.62275C12.333 6.97638 12.1925 7.31552 11.9425 7.56556C11.6924 7.81561 11.3533 7.95609 10.9997 7.95609C10.6461 7.95609 10.3069 7.81561 10.0569 7.56556C9.80682 7.31552 9.66634 6.97638 9.66634 6.62275C9.66634 4.81742 8.18634 3.33342 6.33301 3.33342ZM10.9997 2.87875C10.4351 2.18642 9.72327 1.62865 8.91602 1.24601C8.10876 0.863371 7.22636 0.665487 6.33301 0.666754C3.03167 0.666754 0.333008 3.32009 0.333008 6.62275C0.333008 9.62409 2.02234 12.4094 3.96901 14.6814C5.94367 16.9868 8.36501 18.9721 10.181 20.3854C10.4151 20.5675 10.7031 20.6663 10.9997 20.6663C11.2962 20.6663 11.5843 20.5675 11.8183 20.3854C13.6343 18.9721 16.0557 16.9854 18.0303 14.6814C19.977 12.4094 21.6663 9.62409 21.6663 6.62275C21.6663 3.32009 18.9677 0.666754 15.6663 0.666754C13.7863 0.666754 12.101 1.52809 10.9997 2.87875Z"
                fill="white" class="liked"/>
            </svg>    
         </div>
         <div>
                 <div>
                   <h3 class="title">${result.name}</h3>
                   <span class="id">#${counter}</span>
                 </div>
                 <div>
                   <div>
                     <div>
                        <p>Release date:</p>
                        <p>${formatDayStr || "No date avaiable"}</p>
                     </div>
                     <div>
                        <p>Genres:</p>
                        <p>${
                          genreTitle.substring(0, genreTitle.length - 2) ||
                          "no specific gender"
                        }</p>
                     </div>
                   </div>
                   <div>
                     ${consoles}
                   </div>
                 </div>
                 <div>
                    <p>${result.description || "No description available"}</p>
                 </div>
          </div>
    </button>`;
  });

const modal = (currentGame) =>
  currentGame.map((result) => {
    let genreTitle = "";
    let consoles = [];
    let allPlatforms = "";
    let shortScreenshots = [];
    let publisher = "";
    let developed = "";
    let date = result.released;

    const genres = result.genres;
    const publishers = result.publishers;
    const developers = result.developers;
    const platforms = result.platforms;
    const parentPlatforms = result.parent_platforms;
    const screenshot = result.short_screenshots;
    const clip = movies?.data;

    const newDate = date?.split("-");
    const month = newDate[1];
    const currentMonth = months[month];
    const formatDayStr = `${currentMonth} ${date[2]}, ${date[0]}`;

    genres.forEach((genre) => {
      genreTitle += `${genre.name}, `;
    });

    developers.forEach((dev) => {
      developed += `${dev.name}, `;
    });

    publishers.forEach((p) => {
      publisher += `${p.name}, `;
    });

    parentPlatforms.forEach((platform) => {
      const id = platform.platform.id;
      consoles.push(platformsImg[id]);
    });

    platforms.forEach((platform) => {
      const name = platform.platform.name;
      allPlatforms += `${name}, `;
    });

    screenshot.forEach((img) => {
      const images = img.image;
      shortScreenshots.push(images);
    });

    modalBg = `linear-gradient(
      180deg,
      var(--modal-bg-1) 0%,
      var(--modal-bg-2) 84.4%
    ), url("${result.background_image || bgDefault}")`;

    return `<div>
    <button class="modal-cross-btn">
      <svg width="43" height="69" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29303 5.29296C5.48056 5.10549 5.73487 5.00017 6.00003 5.00017C6.26519 5.00017 6.5195 5.10549 6.70703 5.29296L12 10.586L17.293 5.29296C17.3853 5.19745 17.4956 5.12127 17.6176 5.06886C17.7396 5.01645 17.8709 4.98886 18.0036 4.98771C18.1364 4.98655 18.2681 5.01186 18.391 5.06214C18.5139 5.11242 18.6255 5.18667 18.7194 5.28056C18.8133 5.37446 18.8876 5.48611 18.9379 5.60901C18.9881 5.7319 19.0134 5.86358 19.0123 5.99636C19.0111 6.12914 18.9835 6.26036 18.9311 6.38236C18.8787 6.50437 18.8025 6.61471 18.707 6.70696L13.414 12L18.707 17.293C18.8892 17.4816 18.99 17.7342 18.9877 17.9964C18.9854 18.2586 18.8803 18.5094 18.6948 18.6948C18.5094 18.8802 18.2586 18.9854 17.9964 18.9876C17.7342 18.9899 17.4816 18.8891 17.293 18.707L12 13.414L6.70703 18.707C6.51843 18.8891 6.26583 18.9899 6.00363 18.9876C5.74143 18.9854 5.49062 18.8802 5.30521 18.6948C5.1198 18.5094 5.01463 18.2586 5.01236 17.9964C5.01008 17.7342 5.11087 17.4816 5.29303 17.293L10.586 12L5.29303 6.70696C5.10556 6.51943 5.00024 6.26512 5.00024 5.99996C5.00024 5.73479 5.10556 5.48049 5.29303 5.29296Z"
                fill="#515151"/>
      </svg>
    </button>
    <div>
    <div class="modal-platforms__container">
     ${consoles.join("")}
    </div>
    <h1 class="modal-title">${result.name}</h1>
   <div class="modal-chips__container">
     <div><p>${formatDayStr || "No date avaiable"}</p></div>
     <div>
       <span>#${result.rating_top}</span>
       <p>TOP 2021</p>
     </div>
     <div>
       <span>#9</span>
       <p>RPG</p>
     </div>
   </div>
   <div class="modal-description">
   ${result.description || "No description available"}
   </div>
   <div class="modal-primary-btns__container">
     <button>
       Add to wishlist
       <svg
         class="favorite"
         width="22"
         height="21"
         viewBox="0 0 22 21"
         fill="white"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           fill-rule="evenodd"
           clip-rule="evenodd"
           d="M6.33301 3.33342C4.47967 3.33342 2.99967 4.81742 2.99967 6.62275C2.99967 8.65475 4.17567 10.8228 5.99434 12.9468C7.52234 14.7294 9.37834 16.3374 10.9997 17.6348C12.621 16.3374 14.477 14.7281 16.005 12.9468C17.8237 10.8228 18.9997 8.65342 18.9997 6.62275C18.9997 4.81742 17.5197 3.33342 15.6663 3.33342C13.813 3.33342 12.333 4.81742 12.333 6.62275C12.333 6.97638 12.1925 7.31552 11.9425 7.56556C11.6924 7.81561 11.3533 7.95609 10.9997 7.95609C10.6461 7.95609 10.3069 7.81561 10.0569 7.56556C9.80682 7.31552 9.66634 6.97638 9.66634 6.62275C9.66634 4.81742 8.18634 3.33342 6.33301 3.33342ZM10.9997 2.87875C10.4351 2.18642 9.72327 1.62865 8.91602 1.24601C8.10876 0.863371 7.22636 0.665487 6.33301 0.666754C3.03167 0.666754 0.333008 3.32009 0.333008 6.62275C0.333008 9.62409 2.02234 12.4094 3.96901 14.6814C5.94367 16.9868 8.36501 18.9721 10.181 20.3854C10.4151 20.5675 10.7031 20.6663 10.9997 20.6663C11.2962 20.6663 11.5843 20.5675 11.8183 20.3854C13.6343 18.9721 16.0557 16.9854 18.0303 14.6814C19.977 12.4094 21.6663 9.62409 21.6663 6.62275C21.6663 3.32009 18.9677 0.666754 15.6663 0.666754C13.7863 0.666754 12.101 1.52809 10.9997 2.87875Z"
           fill="white"
           class="liked"
         />
       </svg>
     </button>
     <button>Purchase</button>
   </div>
   </div> 
    <div class="modal-info__container">
     <div>
       <div>
         <p>Platforms</p>
         <p>${allPlatforms.substring(0, allPlatforms.length - 2)}</p>
       </div>
       <div>
         <p>Release date</p>
         <p>${formatDayStr || "No date avaiable"}</p>
       </div>
       <div>
         <p>Publisher</p>
         <p>${publisher.substring(0, publisher.length - 2)}</p>
       </div>
       <div>
         <p>Website</p>
         <a href=${result.website}" target="_blank">${
      result.website || "No website avaiable"
    }</a>
       </div>
     </div>
     <div>
       <div>
         <p>Genre</p>
         <p>${
           genreTitle.substring(0, genreTitle.length - 2) ||
           "no specific gender"
         }</p>
       </div>
       <div>
         <p>Developed</p>
         <p>${developed.substring(0, developed.length - 2)}</p>
       </div>
       <div>
         <p>Age Rating</p>
         <p>Not Rated</p>
       </div>
       <div>
         <svg
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             fill-rule="evenodd"
             clip-rule="evenodd"
             d="M23.8 18.3692L23.801 18.3722C24.131 18.8022 24.289 20.2311 22.026 19.9771C21.0968 19.8863 20.1834 19.6746 19.309 19.3471C18.6256 19.0851 17.9719 18.7513 17.359 18.3512C16.4507 18.7167 15.4886 18.9309 14.511 18.9851C13.8134 19.9213 12.9065 20.6813 11.8628 21.2046C10.8191 21.7279 9.66754 21.9999 8.50001 21.999C7.71224 21.9997 6.9293 21.8762 6.18001 21.633C5.74001 21.888 5.24001 22.137 4.68801 22.346C3.56801 22.77 2.63901 22.929 1.97101 22.976C1.47101 23.0129 1.11801 22.9869 0.944007 22.967C0.562007 22.923 0.220007 22.705 0.0720068 22.339C0.00844977 22.1806 -0.0135218 22.0086 0.00818299 21.8394C0.0298878 21.6701 0.0945468 21.5092 0.196007 21.372C0.448007 21.027 0.680007 20.6661 0.900007 20.3001C1.32801 19.5861 1.74801 18.8162 1.85401 17.9782C1.38506 17.083 1.10189 16.1023 1.02149 15.0949C0.941088 14.0875 1.06512 13.0743 1.38614 12.1161C1.70715 11.1578 2.21853 10.2744 2.88956 9.51869C3.56058 8.76303 4.37742 8.15078 5.29101 7.71869C5.61087 6.51028 6.17897 5.38175 6.95912 4.40502C7.73926 3.4283 8.71434 2.6248 9.8222 2.04573C10.9301 1.46666 12.1464 1.12473 13.3937 1.04172C14.6411 0.958707 15.892 1.13644 17.0669 1.5636C18.2417 1.99075 19.3147 2.65795 20.2174 3.52269C21.1201 4.38742 21.8327 5.43072 22.3099 6.58608C22.7871 7.74145 23.0183 8.98356 22.9889 10.2332C22.9595 11.4829 22.67 12.7128 22.139 13.8444C21.949 15.5683 22.816 17.0192 23.799 18.3692H23.8ZM7.00001 9.99958C7.00055 8.94483 7.23947 7.90384 7.69891 6.95439C8.15834 6.00495 8.82642 5.17161 9.65321 4.51664C10.48 3.86167 11.4441 3.402 12.4736 3.172C13.503 2.942 14.5711 2.9476 15.598 3.18838C16.625 3.42917 17.5842 3.89891 18.4041 4.56252C19.224 5.22612 19.8833 6.06643 20.3327 7.02063C20.7822 7.97484 21.0102 9.01828 20.9997 10.073C20.9891 11.1277 20.7404 12.1664 20.272 13.1114C20.224 13.208 20.1919 13.3116 20.177 13.4184C19.958 14.9933 20.327 16.4293 21.082 17.8082C19.9899 17.5425 18.9604 17.0651 18.052 16.4033C17.9061 16.2974 17.7342 16.233 17.5547 16.2168C17.3751 16.2006 17.1945 16.2332 17.032 16.3113C15.9647 16.8242 14.7848 17.0579 13.6025 16.9907C12.4203 16.9234 11.2744 16.5574 10.2722 15.9268C9.26994 15.2963 8.44403 14.4217 7.87176 13.3851C7.29948 12.3485 6.99955 11.1837 7.00001 9.99958ZM5.00401 10.2536C5.06025 12.2429 5.77405 14.1576 7.03384 15.6982C8.29362 17.2389 10.0284 18.3188 11.967 18.7692C10.9877 19.5666 9.76292 20.0011 8.50001 19.9991C7.77001 19.9991 7.07701 19.8581 6.44301 19.6021C6.29459 19.5421 6.13393 19.5186 5.97453 19.5335C5.81513 19.5485 5.66165 19.6015 5.52701 19.6881C5.08801 19.9711 4.56701 20.2531 3.97901 20.4761C3.6313 20.6086 3.2756 20.7192 2.91401 20.8071C3.24701 20.2001 3.58401 19.4771 3.73801 18.7972C3.81501 18.4602 3.85801 18.1332 3.87601 17.8262C3.88821 17.6288 3.84157 17.4322 3.74201 17.2612C3.25411 16.4227 2.99802 15.4695 3.00001 14.4994C3.00001 12.7894 3.78001 11.2625 5.00401 10.2536Z"
             fill="#515151"
           />
         </svg>
         <svg
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             fill-rule="evenodd"
             clip-rule="evenodd"
             d="M10.973 4.944C10.773 5.957 10.437 7.477 9.207 8.707C9.095 8.819 8.972 8.937 8.842 9.063C7.7 10.164 6 11.804 6 14.5C6 15.963 6.63 17.35 7.601 18.375C8.578 19.406 9.829 20 11 20H16C16.352 20 16.646 19.91 16.82 19.793C16.965 19.697 17 19.613 17 19.5C17 19.388 16.965 19.303 16.82 19.207C16.646 19.091 16.352 19 16 19H15C14.7348 19 14.4804 18.8946 14.2929 18.7071C14.1054 18.5196 14 18.2652 14 18C14 17.7348 14.1054 17.4804 14.2929 17.2929C14.4804 17.1054 14.7348 17 15 17H16.5C16.852 17 17.146 16.91 17.32 16.793C17.465 16.697 17.5 16.613 17.5 16.5C17.5 16.388 17.465 16.303 17.32 16.207C17.146 16.091 16.852 16 16.5 16H15.5C15.2348 16 14.9804 15.8946 14.7929 15.7071C14.6054 15.5196 14.5 15.2652 14.5 15C14.5 14.7348 14.6054 14.4804 14.7929 14.2929C14.9804 14.1054 15.2348 14 15.5 14H17C17.352 14 17.646 13.91 17.82 13.793C17.965 13.697 18 13.613 18 13.5C18 13.388 17.965 13.303 17.82 13.207C17.646 13.091 17.352 13 17 13H16C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11H17C17.352 11 17.646 10.91 17.82 10.793C17.965 10.697 18 10.613 18 10.5C18 10.388 17.965 10.303 17.82 10.207C17.646 10.091 17.352 10 17 10H12.5C12.341 10 12.1843 9.96217 12.0429 9.88954C11.9015 9.8169 11.7794 9.71159 11.6868 9.58234C11.5942 9.45309 11.5338 9.30363 11.5105 9.14636C11.4872 8.98908 11.5018 8.82852 11.553 8.678V8.677L11.557 8.667L11.57 8.627L11.623 8.457C11.667 8.307 11.728 8.09 11.791 7.829C11.9431 7.21731 12.0362 6.59245 12.069 5.963C12.095 5.278 12.004 4.753 11.821 4.433C11.713 4.243 11.55 4.072 11.171 4.018C11.123 4.182 11.079 4.406 11.015 4.734L10.973 4.944ZM13.803 8C13.925 7.442 14.041 6.747 14.068 6.037C14.098 5.222 14.018 4.247 13.558 3.442C13.048 2.546 12.146 2 10.9 2C10.518 2 10.16 2.126 9.87 2.38C9.607 2.61 9.457 2.896 9.364 3.126C9.216 3.493 9.124 3.969 9.047 4.371L9.011 4.556C8.817 5.543 8.563 6.523 7.793 7.293C7.705 7.381 7.598 7.483 7.476 7.598C6.353 8.662 4 10.893 4 14.5C4 16.537 4.87 18.4 6.149 19.75C7.422 21.094 9.171 22 11 22H16C16.648 22 17.354 21.84 17.93 21.457C18.535 21.053 19 20.387 19 19.5C19 19.031 18.87 18.625 18.66 18.285C19.149 17.875 19.5 17.272 19.5 16.5C19.5 16.031 19.37 15.624 19.16 15.286C19.649 14.876 20 14.272 20 13.5C20 12.891 19.782 12.387 19.449 12C19.781 11.613 20 11.109 20 10.5C20 9.612 19.535 8.947 18.93 8.543C18.354 8.159 17.648 8 17 8H13.803Z"
             fill="#515151"
           />
         </svg>
         <svg
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             fill-rule="evenodd"
             clip-rule="evenodd"
             d="M11.293 2.29303C11.4805 2.10556 11.7348 2.00024 12 2.00024C12.2652 2.00024 12.5195 2.10556 12.707 2.29303L16.707 6.29303C16.8892 6.48163 16.99 6.73423 16.9877 6.99643C16.9854 7.25863 16.8802 7.50944 16.6948 7.69485C16.5094 7.88026 16.2586 7.98543 15.9964 7.9877C15.7342 7.98998 15.4816 7.88919 15.293 7.70703L13 5.41403V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8947 12.2652 16 12 16C11.7348 16 11.4804 15.8947 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V5.41403L8.707 7.70703C8.5184 7.88919 8.2658 7.98998 8.0036 7.9877C7.7414 7.98543 7.49059 7.88026 7.30518 7.69485C7.11977 7.50944 7.0146 7.25863 7.01233 6.99643C7.01005 6.73423 7.11084 6.48163 7.293 6.29303L11.293 2.29303ZM5 13C5 12.2044 5.31607 11.4413 5.87868 10.8787C6.44129 10.3161 7.20435 10 8 10H9C9.26522 10 9.51957 10.1054 9.70711 10.2929C9.89464 10.4805 10 10.7348 10 11C10 11.2652 9.89464 11.5196 9.70711 11.7071C9.51957 11.8947 9.26522 12 9 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4805 7 12.7348 7 13V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8947 7.73478 20 8 20H16C16.2652 20 16.5196 19.8947 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V13C17 12.7348 16.8946 12.4805 16.7071 12.2929C16.5196 12.1054 16.2652 12 16 12H15C14.7348 12 14.4804 11.8947 14.2929 11.7071C14.1054 11.5196 14 11.2652 14 11C14 10.7348 14.1054 10.4805 14.2929 10.2929C14.4804 10.1054 14.7348 10 15 10H16C16.7956 10 17.5587 10.3161 18.1213 10.8787C18.6839 11.4413 19 12.2044 19 13V19C19 19.7957 18.6839 20.5587 18.1213 21.1214C17.5587 21.684 16.7956 22 16 22H8C7.20435 22 6.44129 21.684 5.87868 21.1214C5.31607 20.5587 5 19.7957 5 19V13Z"
             fill="#515151"
           />
         </svg>
       </div>
     </div>
   </div>
 </div>
 <!-- Right Side-->
 <div class="modal-captures__container">
   <video
     poster="${movies?.preview || shortScreenshots[0]}"
     width="392"
     height="217"
     ${clip ? "controls" : ""}
    
   >
     <source src="${clip ? clip["480"] : ""}" type="video/mp4" />
     Your browser does not support the video tag
   </video>
   
   <div>
     <img src="${shortScreenshots[2] || bgDefault}" />
     <img src="${shortScreenshots[3] || bgDefault}" />
     <img src="${shortScreenshots[4] || bgDefault}" />
     <img src="${shortScreenshots[5] || bgDefault}" />
   </div>
 </div>`;
  });

// Display last searches cards

function handleLastSearches() {
  displayLoading();
  cardContainer.innerHTML = "";
  hideLoading();
  lastSearches.style.color = "#5fe19b";
  homeText.style.color = "#fff";
  if (lastResults.length == 0 || !lastResults) {
    notFoundText.style.display = "block";
    notFoundText.innerHTML = `No searches were made`;
  } else {
    const twoLastResults = lastResults.slice(-2);
    let allLastCards = "";

    twoLastResults.forEach((res) => {
      const lastCards = card(res);
      allLastCards += lastCards;
    });

    if (threeViewVal) {
      cardsDisplay(
        "one-card-view__card__container",
        "home__card__container",
        "one-card-view__card",
        "home__main__card"
      );
    } else {
      cardsDisplay(
        "home__card__container",
        "one-card-view__card__container",
        "home__main__card",
        "one-card-view__card"
      );
    }

    cardContainer.innerHTML = allLastCards;
  }
}

// Card View Displays

function handleThreeView() {
  threeVwIcon.classList.add("active");
  threeVwIcon.classList.remove("inactive");

  oneVwIcon.classList.add("inactive");
  oneVwIcon.classList.remove("active");

  oneCardVwBtn.disabled = false;
  threeCardVwBtn.disabled = true;

  oneViewVal = !oneViewVal;
  threeViewVal = !threeViewVal;

  cardsDisplay(
    "one-card-view__card__container",
    "home__card__container",
    "one-card-view__card",
    "home__main__card"
  );
}

function handleOneView() {
  oneVwIcon.classList.add("active");
  oneVwIcon.classList.remove("inactive");

  threeVwIcon.classList.add("inactive");
  threeVwIcon.classList.remove("active");

  threeCardVwBtn.disabled = true;
  threeCardVwBtn.disabled = false;

  oneViewVal = !oneViewVal;
  threeViewVal = !threeViewVal;

  cardsDisplay(
    "home__card__container",
    "one-card-view__card__container",
    "home__main__card",
    "one-card-view__card"
  );
}

// Like cards

function addFavorite(e) {
  const heart = e.target;

  const currentHeart = heart.children[0];

  if (currentHeart.getAttribute("fill-rule") === "#fff") {
    currentHeart.classList.remove("liked");
    currentHeart.removeAttribute("fill-rule");
    currentHeart.setAttribute("fill-rule", "evenodd");
  } else {
    currentHeart.classList.add("liked");
    currentHeart.removeAttribute("fill-rule");
    currentHeart.setAttribute("fill-rule", "#fff");
  }
}

let allData = [];
let lastCardOnScreen;

// Fetch games

async function getGames(url) {
  const getData = await fetch(url);
  const dataToJson = await getData.json();

  return dataToJson;
}

function onLoad(gamesUrl) {
  homeText.style.color = `#5fe19b`;
  lastSearches.style = "#fff";
  notFoundText.style.display = "none";
  displayLoading();

  getGames(gamesUrl).then((data) => {
    gameData = data.results;
    nextPage = data.next;

    gameData.forEach((game) => allData.push(game));

    getDescription(gameData).then((data) => {
      hideLoading();
      // nextPage = data.next;

      const currentCard = card(data);
      const allCards = currentCard.join(" ");

      cardContainer.innerHTML += allCards;

      handleModal(displayModal);
      handleFavorite();

      isLoading = false;

      const cardsOnScreen = document.querySelectorAll(
        ".cards-container  .home__main__card"
      );

      lastCardOnScreen = cardsOnScreen[cardsOnScreen.length - 1];
      observer.observe(lastCardOnScreen);
    });
  });
}

function handleModal(fn) {
  title = document.getElementsByClassName("title");
  Array.from(title).forEach((title) => title.addEventListener("click", fn));
}

function handleFavorite() {
  favorite = document.getElementsByClassName("favorite");
  Array.from(favorite).forEach((heart) =>
    heart.addEventListener("click", addFavorite)
  );
}

// modal

function getTrailer(gameId) {
  const trailers = fetch(
    `https://api.rawg.io/api/games/${gameId}/movies?${apiKey}&`
  )
    .then((res) => res.json())
    .then((data) => {
      const clips = data.results;

      return clips;
    });

  return trailers;
}

function displayModal(e) {
  displayLoading();
  getModalInfo(allData, e);
}

function searchModal(e) {
  displayLoading();
  getModalInfo(searchData, e);
}

function getModalInfo(gameData, e) {
  getDescription(gameData).then((data) => {
    const currentName = e.target.innerHTML;

    const currentGame = data.filter((item) => {
      if (item.name === currentName) {
        return item;
      }
    });

    if (currentGame.length > 0) {
      const gameId = currentGame[0].id;
      const trailer = getTrailer(gameId);
      trailer.then((data) => {
        if (data) {
          movies = data[0];
        }

        const activeModal = modal(currentGame);
        modalDoc.innerHTML = activeModal;
        modalDoc.style.backgroundImage = modalBg;
        modalRoot.classList.add("visible");
        hideLoading();
      });
    }
  });
}

// Fetch game filter by search keyword

function handleChange(e) {
  const inputValue = e.target.value;
  const consoles = { pc: 1, playstation: 2, xbox: 3, nintendo: 7 };
  const platformNames = Object.keys(consoles);

  currentValue = inputValue.toLowerCase();
  cross.style.visibility = "visible";

  if (!currentValue || (!currentValue && e.keyCode === 13)) {
    counter = 0;
    cross.style.visibility = "hidden";
    cardContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    displayLoading();
    onLoad(gamesUrl);
    hideLoading();
  } else if (currentValue && platformNames.includes(currentValue)) {
    const id = consoles[currentValue];
    const platformsUrl = `https://api.rawg.io/api/games?${apiKey}&parent_platforms=${id}`;
    displayLoading();

    getGames(platformsUrl).then((data) => {
      const longData = data.results;
      nextPage = data.next;
      let allSearchCards;

      getDescription(longData).then((data) => {
        searchData = data;
        const searchCard = card(data);
        allSearchCards = searchCard.join(" ");

        if (!allSearchCards) {
          notFoundText.classList.add("not-found-text");
          cardContainer.innerHTML = "";
          notFoundText.innerHTML = "No search results";
        } else if (threeViewVal) {
          notFoundText.style.display = "none";
          cardsDisplay(
            "one-card-view__card__container",
            "home__card__container",
            "one-card-view__card",
            "home__main__card"
          );

          hideLoading();
          layer.style.display = "none";
          cardContainer.innerHTML = allSearchCards;
          handleModal(searchModal);
        } else {
          notFoundText.style.display = "none";
          cardsDisplay(
            "home__card__container",
            "one-card-view__card__container",
            "home__main__card",
            "one-card-view__card"
          );

          hideLoading();
          cardContainer.innerHTML = allSearchCards;
          handleModal(searchModal);
        }

        handleFavorite();
      });
    });
  } else if (currentValue.length >= 3 || e.keyCode === 13) {
    displayLoading();
    const searchUrl = `https://api.rawg.io/api/games?${apiKey}&search=${currentValue}`;

    getGames(searchUrl).then((data) => {
      const longData = data.results;
      const shortData = longData.slice(0, 4);
      const searchResults = [];
      const allSearchResults = [];

      searchResults.push(shortData);
      allSearchResults.push(longData);
      nextPage = data.next;
      const l = searchResults.length;
      let allSearchCards;

      for (let i = 0; i < l; i++) {
        let item = searchResults[i];
        const firstResult = searchResults[i].slice(0, 1);
        lastResults.push(firstResult);

        const options = optionButton(item);
        const allOptions = options.join("");
        optionsContainer.innerHTML = allOptions;

        const searchOption = document.getElementsByClassName("options");
        const sl = searchOption.length;

        for (let i = 0; i < sl; i++) {
          const element = searchOption[i];
          searchOption[i].addEventListener("click", () => {
            const currentOption = element.value;
            input.value = currentOption;
            cross.style.visibility = "hidden";
            handleChange(e);
          });
        }
      }

      getDescription(longData).then((data) => {
        searchData = data;
        const searchCard = card(data);
        allSearchCards = searchCard.join(" ");

        if (!allSearchCards) {
          notFoundText.style.display = "block";
          cardContainer.innerHTML = "";

          notFoundText.innerHTML = `No results found`;
          hideLoading();
        } else if (threeViewVal) {
          notFoundText.style.display = "none";

          cardsDisplay(
            "one-card-view__card__container",
            "home__card__container",
            "one-card-view__card",
            "home__main__card"
          );
          hideLoading();

          cardContainer.innerHTML = allSearchCards;
          handleModal(searchModal);
        } else {
          notFoundText.style.display = "none";

          cardsDisplay(
            "home__card__container",
            "one-card-view__card__container",
            "home__main__card",
            "one-card-view__card"
          );
          hideLoading();

          const cardsOnScreen = document.querySelectorAll(
            ".cards-container  .one-card-view__card"
          );
          lastCardOnScreen = cardsOnScreen[cardsOnScreen.length - 1];

          cardContainer.innerHTML = allSearchCards;
          handleModal(searchModal);
        }

        handleFavorite();
      });
    });
  }

  lastSearches.style.color = "#fff";
}

// Home Page

function handleHomeText() {
  homeText.style.color = "#5fe19b";
  lastSearches.style.color = "#fff";
  cardContainer.innerHTML = "";
  counter = 0;

  if (threeViewVal) {
    cardsDisplay(
      "one-card-view__card__container",
      "home__card__container",
      "one-card-view__card",
      "home__main__card"
    );
  } else {
    cardsDisplay(
      "home__card__container",
      "one-card-view__card__container",
      "home__main__card",
      "one-card-view__card"
    );
  }
  allData = [];
  onLoad(gamesUrl);
}

window.addEventListener("load", () => {
  onLoad(gamesUrl);
});
