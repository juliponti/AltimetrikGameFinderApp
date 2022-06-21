import {
  debounce,
  img,
  optionButton,
  displayLoading,
  hideLoading,
  months,
  platformsImg,
  cardsDisplay,
} from "./utils.js";

// header
const input = document.getElementById("home-input");
const cross = document.getElementById("cross");
const layer = document.getElementById("layer");
const userImg = document.getElementById("user-img-container");

//  banner
const optionsContainer = document.getElementById("options-cont");
const threeCardVwBtn = document.getElementById("three-card-view-btn");
const oneCardVwBtn = document.getElementById("one-card-view-btn");

// primary-section
const gallery = document.getElementById("gallery");
const cardContainer = document.getElementById("cards-container");
const notFoundText = document.getElementById("not-found");
const gamesUrl = `https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621&page=1`;

// aside
const lastSearches = document.getElementById("last-searches");
const homeText = document.getElementById("home-text");
const menuHomeText = document.getElementById("menu-home-text");

let counter = 0;
let pageNum = 1;
let currentValue;

let threeViewVal;
let oneViewVal;

let lastResults = [];
let nextPage;

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

gallery.addEventListener("scroll", handleScroll);
threeCardVwBtn.addEventListener("click", handleThreeView);
oneCardVwBtn.addEventListener("click", handleOneView);

homeText.addEventListener("click", handleHomeText);
homeText.addEventListener("keypress", handleHomeText);
menuHomeText.addEventListener("click", handleHomeText);
lastSearches.addEventListener("click", handleLastSearches);
lastSearches.addEventListener("keypress", handleLastSearches);

// adds a profile pic if there is one or the initials if there isn't

if (localStorage.getItem("picture") == "true") {
  userImg.style.backgroundImage = `url("../../assets/desktop/home/header/Custom.png")`;
} else {
  userImg.style.backgroundImage = `url("../../assets/desktop/home/header/EmptyState.png")`;
}

// card view in three columns active by default

threeViewVal = true;
oneViewVal = false;

// Cards component

const card = (page) =>
  page.map((result) => {
    let genreTitle = "";
    let consoles = [];
    let date = result.released;

    const bgDefault = "../../assets/desktop/home/card/bg-default.jpg";
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
      threeViewVal ? "home__main__card" : "one-card-view__card "
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
                   <h3>${result.name}</h3>
                   <span>#${counter}</span>
                 </div>
                 <div>
                   <div>
                     <div>
                        <p>Release date:</p>
                        <p>${formatDayStr}</p>
                     </div>
                     <div>
                        <p>Genres:</p>
                        <p>${genreTitle.substring(0, genreTitle.length - 2)}</p>
                     </div>
                   </div>
                   <div>
                     ${consoles}
                   </div>
                 </div>
                 <div>
                    <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem consectetur quis in deserunt minus id laudantium fugiat optio reiciendis! Est deserunt accusamus necessitatibus perspiciatis minima maiores voluptate voluptates iure porro! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem consectetur quis in deserunt minus id laudantium fugiat optio reiciendis! Est deserunt accusamus necessitatibus perspiciatis minima maiores voluptate voluptates iure porro!  </p>
                 </div>
          </div>
    </button>`;
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
    gallery.addEventListener("scroll", handleScroll, false);
  }
}

// Card View Displays

function handleThreeView() {
  const iconActive = img(
    "../../assets/desktop/home/banner/three-view-active.svg"
  );
  const iconDisable = img(
    "../../assets/desktop/home/banner/one-view-disable.svg"
  );
  threeCardVwBtn.innerHTML = iconActive;
  oneCardVwBtn.innerHTML = iconDisable;

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
  const iconActive = img(
    "../../assets/desktop/home/banner/one-view-active.svg"
  );
  const iconDisable = img(
    "../../assets/desktop/home/banner/three-view-disable.svg"
  );

  oneCardVwBtn.innerHTML = iconActive;
  threeCardVwBtn.innerHTML = iconDisable;

  oneCardVwBtn.disabled = true;
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

function handleFavorite(e) {
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

// Fetch games

async function fetchData(url) {
  homeText.style.color = `#5fe19b`;
  lastSearches.style = "#fff";
  notFoundText.style.display = "none";

  displayLoading();
  const getData = await fetch(url);
  const dataToJson = await getData.json();
  const results = dataToJson.results;
  hideLoading();
  nextPage = dataToJson.next;

  const currentCard = card(results);
  const allCards = currentCard.join(" ");

  cardContainer.innerHTML += allCards;
}

// Allows to fetch next page

function handleScroll() {
  if (gallery.offsetHeight + gallery.scrollTop >= gallery.scrollHeight - 1) {
    pageNum = pageNum + 1;
    fetchData(nextPage);
  }
}

// Fetch game filter by search keyword

function handleChange(e) {
  const inputValue = e.target.value;
  const consoles = { pc: 1, playstation: 2, xbox: 3, nintendo: 7 };
  const platformNames = Object.keys(consoles);
  gallery.removeEventListener("scroll", handleScroll, true);

  currentValue = inputValue.toLowerCase();
  cross.style.visibility = "visible";

  if (!currentValue || (!currentValue && e.keyCode === 13)) {
    cross.style.visibility = "hidden";
    counter = 0;
    pageNum = 1;
    cardContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    displayLoading();
    load();
    hideLoading();
  } else if (currentValue && platformNames.includes(currentValue)) {
    const id = consoles[currentValue];

    displayLoading();
    fetch(
      `https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621&parent_platforms=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const longData = data.results;
        nextPage = data.next;
        const searchResults = [];
        searchResults.push(longData);
        const l = searchResults.length;
        let allSearchCards;

        for (let i = 0; i < l; i++) {
          let item = searchResults[i];

          const firstResult = item.slice(0, 1);
          lastResults.push(firstResult);

          const searchCard = card(item);
          allSearchCards = searchCard.join(" ");
        }

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
        }
      });
  } else if (currentValue.length >= 3 || e.keyCode === 13) {
    displayLoading();
    fetch(
      `https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621&search=${currentValue}`
    )
      .then((res) => res.json())
      .then((data) => {
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

        for (let i = 0; i < allSearchResults.length; i++) {
          const item = allSearchResults[i];

          const searchCard = card(item);
          allSearchCards = searchCard.join(" ");
        }

        if (allSearchCards == "") {
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
        }
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
  load();
}

async function load() {
  await fetchData(gamesUrl);

  const favorite = document.getElementsByClassName("favorite");
  Array.from(favorite).forEach((heart) =>
    heart.addEventListener("click", handleFavorite)
  );
}

load();
