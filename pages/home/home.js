import {
  debounce,
  img,
  optionButton,
  displayLoading,
  hideLoading,
  currentDisplay,
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
const oneViewContainer = document.getElementById("oneView-container");

// aside
const lastSearches = document.getElementById("last-searches");
const homeText = document.getElementById("home-text");

let counter = 0;
let pageNum = 1;
let currentValueTW;

let threeViewVal;
let oneViewVal;

let lastResults = [];

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

gallery.addEventListener("scroll", handleScroll, false);
threeCardVwBtn.addEventListener("click", handleThreeView);
oneCardVwBtn.addEventListener("click", handleOneView);

homeText.addEventListener("click", handleHomeText);
lastSearches.addEventListener("click", handleLastSearches);

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
    counter = counter + 1;
    let genreTitle = "";
    let consoles = [];
    let bgDefault;

    for (let i = 0; i < result.genres.length; i++) {
      genreTitle += `${result.genres[i].name}, `;
    }
    for (let i = 0; i < result.parent_platforms.length; i++) {
      const parentPlatform = result.parent_platforms[i];
      const id = parentPlatform.platform.id;
      switch (id) {
        case 1:
          const pc = `<img src="../../assets/desktop/home/card/windows-icon.svg" alt="windows logo"/>`;
          consoles.push(pc);
          break;
        case 2:
          const ps = `<img src="../../assets/desktop/home/card/ps-icon.svg" alt="playstation logo"/>`;
          consoles.push(ps);
          break;
        case 3:
          const xbox = `<img src="../../assets/desktop/home/card/xbox-icon.svg" alt="xbox logo"/>`;
          consoles.push(xbox);
          break;
        case 7:
          const nintendo = `<img src="../../assets/desktop/home/card/nintendo.svg" alt="nintendo logo"/>`;
          consoles.push(nintendo);
          break;
        default:
          " ";
          break;
      }
    }

    const card1 = ` <button class="home__main__card">
          <div class="home__main__card-img__container">
           <img src="${result.background_image || bgDefault}" alt="${
      result.name
    }"/>
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              id="favorite"
              >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.33301 3.33342C4.47967 3.33342 2.99967 4.81742 2.99967 6.62275C2.99967 8.65475 4.17567 10.8228 5.99434 12.9468C7.52234 14.7294 9.37834 16.3374 10.9997 17.6348C12.621 16.3374 14.477 14.7281 16.005 12.9468C17.8237 10.8228 18.9997 8.65342 18.9997 6.62275C18.9997 4.81742 17.5197 3.33342 15.6663 3.33342C13.813 3.33342 12.333 4.81742 12.333 6.62275C12.333 6.97638 12.1925 7.31552 11.9425 7.56556C11.6924 7.81561 11.3533 7.95609 10.9997 7.95609C10.6461 7.95609 10.3069 7.81561 10.0569 7.56556C9.80682 7.31552 9.66634 6.97638 9.66634 6.62275C9.66634 4.81742 8.18634 3.33342 6.33301 3.33342ZM10.9997 2.87875C10.4351 2.18642 9.72327 1.62865 8.91602 1.24601C8.10876 0.863371 7.22636 0.665487 6.33301 0.666754C3.03167 0.666754 0.333008 3.32009 0.333008 6.62275C0.333008 9.62409 2.02234 12.4094 3.96901 14.6814C5.94367 16.9868 8.36501 18.9721 10.181 20.3854C10.4151 20.5675 10.7031 20.6663 10.9997 20.6663C11.2962 20.6663 11.5843 20.5675 11.8183 20.3854C13.6343 18.9721 16.0557 16.9854 18.0303 14.6814C19.977 12.4094 21.6663 9.62409 21.6663 6.62275C21.6663 3.32009 18.9677 0.666754 15.6663 0.666754C13.7863 0.666754 12.101 1.52809 10.9997 2.87875Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="home__main__card-description__container">
            <div class="home__main__card-description-title__container">
              <h4>${result.name}</h4>
              <span>#${counter}</span>
            </div>
            <div class="home__main__card-description-details__container">
              <div class="description-details--text__container">
                <div>
                  <p>Release date:</p>
                  <p>${result.released}</p>
                </div>
                <div>
                  <p>Genres:</p>
                  <p>${genreTitle.substring(0, genreTitle.length - 2)}</p>
                </div>
              </div>
              <div class="console-logos__container">
             ${consoles.join("")}
              </div>
            </div>
          </div>
        </button>`;

    const card2 = `<button class="one-card-view__card">
    <div class="one-card-view__card-img__container">
    <img src="${result.background_image || bgDefault}" alt="${result.name}"/>
      <svg
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.33301 3.33342C4.47967 3.33342 2.99967 4.81742 2.99967 6.62275C2.99967 8.65475 4.17567 10.8228 5.99434 12.9468C7.52234 14.7294 9.37834 16.3374 10.9997 17.6348C12.621 16.3374 14.477 14.7281 16.005 12.9468C17.8237 10.8228 18.9997 8.65342 18.9997 6.62275C18.9997 4.81742 17.5197 3.33342 15.6663 3.33342C13.813 3.33342 12.333 4.81742 12.333 6.62275C12.333 6.97638 12.1925 7.31552 11.9425 7.56556C11.6924 7.81561 11.3533 7.95609 10.9997 7.95609C10.6461 7.95609 10.3069 7.81561 10.0569 7.56556C9.80682 7.31552 9.66634 6.97638 9.66634 6.62275C9.66634 4.81742 8.18634 3.33342 6.33301 3.33342ZM10.9997 2.87875C10.4351 2.18642 9.72327 1.62865 8.91602 1.24601C8.10876 0.863371 7.22636 0.665487 6.33301 0.666754C3.03167 0.666754 0.333008 3.32009 0.333008 6.62275C0.333008 9.62409 2.02234 12.4094 3.96901 14.6814C5.94367 16.9868 8.36501 18.9721 10.181 20.3854C10.4151 20.5675 10.7031 20.6663 10.9997 20.6663C11.2962 20.6663 11.5843 20.5675 11.8183 20.3854C13.6343 18.9721 16.0557 16.9854 18.0303 14.6814C19.977 12.4094 21.6663 9.62409 21.6663 6.62275C21.6663 3.32009 18.9677 0.666754 15.6663 0.666754C13.7863 0.666754 12.101 1.52809 10.9997 2.87875Z"
          fill="white"
        />
      </svg>
    </div>
    <div class="one-card-view__card-info__container">
      <div class="one-card-view__card-info-title__container">
        <h4>${result.name}</h4>
        <span>#${counter}</span>
      </div>
      <div class="one-card-view__card-info-details__container">
        <div
          class="one-card-view__card-info-details--text__container"
        >
          <div>
            <p>Release date:</p>
            <p>${result.released}</p>
          </div>
          <div>
            <p>Genres:</p>
            <p>${genreTitle.substring(0, genreTitle.length - 2)}</p>
          </div>
        </div>
        <div class="one-card-view__card-console-logos__container">
        ${consoles.join("")}
        </div>
      </div>
      <div class="one-card-view__card-description__container">
        <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, placeat quis? Maiores veritatis quidem tempore consectetur earum ut quaerat consequuntur aliquam et minima dolorem, sit eius nobis. Illum, vitae hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quis natus eaque iste molestiae nobis dolorem cumque fuga commodi distinctio perspiciatis, et iure, tenetur vero harum dolor necessitatibus odit voluptatibus.
        </p>
      </div>
    </div>
  </button>
    `;

    if (threeViewVal) {
      return card1;
    } else {
      return card2;
    }
  });

// Display last searches cards

function handleLastSearches() {
  lastSearches.style.color = "#5fe19b";
  homeText.style.color = "#fff";

  if (lastResults.length == 0 || lastResults.length == 1) {
    console.log("No results found");
  } else {
    const twoLastResults = lastResults.slice(-2);
    const tl = twoLastResults.length;
    let allLastCards = "";

    for (let i = 0; i < tl; i++) {
      const element = twoLastResults[i];
      const lastCards = card(element);
      allLastCards += lastCards;
    }

    if (threeViewVal) {
      currentDisplay(cardContainer, oneViewContainer);

      cardContainer.innerHTML = allLastCards;
      oneViewContainer.innerHTML = "";
    } else {
      currentDisplay(oneViewContainer, cardContainer);

      oneViewContainer.innerHTML = allLastCards;
      cardContainer.innerHTML = "";
    }
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

  counter = 0;
  fetchData(+1);
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
  counter = 0;

  fetchData(+1);
}

// Fetch games

async function fetchData(pageNum) {
  homeText.style.color = "#5fe19b";
  displayLoading();
  const getData = await fetch(
    `https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621&page=${pageNum}`
  );
  const dataToJson = await getData.json();
  const results = dataToJson.results;
  hideLoading();

  const currentCard = card(results);
  const allCards = currentCard.join(" ");

  if (threeViewVal) {
    currentDisplay(cardContainer, oneViewContainer);

    cardContainer.innerHTML += allCards;
    oneViewContainer.innerHTML = "";
  } else {
    currentDisplay(oneViewContainer, cardContainer);

    oneViewContainer.innerHTML += allCards;
    cardContainer.innerHTML = "";
  }
  gallery.addEventListener("scroll", handleScroll);
}

// Allows to fetch next page

function handleScroll() {
  if (gallery.offsetHeight + gallery.scrollTop >= gallery.scrollHeight) {
    pageNum = pageNum + 1;
    fetchData(pageNum);
  }
}

// Fetch game filter by search keyword

function handleChange(e) {
  const currentValue = e.target.value;
  currentValueTW = currentValue.toLowerCase();
  cross.style.visibility = "visible";
  const consoles = { pc: 1, playstation: 2, xbox: 3, nintendo: 7 };
  const platformNames = Object.keys(consoles);

  if (
    currentValueTW == "" ||
    currentValueTW.length == 0 ||
    (currentValueTW == "" && e.keyCode == 13)
  ) {
    cross.style.visibility = "hidden";
    counter = 0;
    pageNum = 1;
    cardContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    fetchData(+1);
  } else if (currentValueTW != "" && platformNames.includes(currentValueTW)) {
    const id = consoles[currentValueTW];
    console.log(id);

    fetch(
      `https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621&parent_platforms=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        const longData = data.results;

        const shortData = longData.slice(0, 5);
        console.log(shortData);
        const searchResults = [];
        searchResults.push(shortData);
        const l = searchResults.length;
        let allSearchCards;

        for (let i = 0; i < l; i++) {
          let item = searchResults[i];

          const firstResult = item.slice(0, 1);
          lastResults.push(firstResult);

          const searchCard = card(item);
          allSearchCards = searchCard.join(" ");
        }
        if (threeViewVal) {
          currentDisplay(cardContainer, oneViewContainer);

          cardContainer.innerHTML = allSearchCards;
          oneViewContainer.innerHTML = "";
        } else {
          currentDisplay(oneViewContainer, cardContainer);

          oneViewContainer.innerHTML = allSearchCards;
          cardContainer.innerHTML = "";
        }
        console.log(lastResults);

        gallery.addEventListener("scroll", handleScroll, false);
      });
  } else if (currentValueTW.length >= 3 || e.keyCode == 13) {
    fetch(
      `https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621&search=${currentValueTW}`
    )
      .then((res) => res.json())
      .then((data) => {
        const longData = data.results;
        const shortData = longData.slice(0, 5);
        console.log(shortData);
        const searchResults = [];
        searchResults.push(shortData);
        const l = searchResults.length;
        let allSearchCards;

        for (let i = 0; i < l; i++) {
          let item = searchResults[i];
          console.log(item);
          const firstResult = searchResults[i].slice(0, 1);
          lastResults.push(firstResult);

          const options = optionButton(item);
          const allOptions = options.join("");
          optionsContainer.innerHTML = allOptions;

          const searchOption = document.getElementsByClassName("options");
          const le = searchOption.length;
          for (let i = 0; i < le; i++) {
            const element = searchOption[i];
            searchOption[i].addEventListener("click", () => {
              const currentOption = element.value;
              input.value = currentOption;
              cross.style.visibility = "hidden";
              handleChange(e);
            });
          }

          const searchCard = card(item);
          allSearchCards = searchCard.join(" ");
        }
        if (threeViewVal) {
          currentDisplay(cardContainer, oneViewContainer);

          cardContainer.innerHTML = allSearchCards;
          oneViewContainer.innerHTML = "";
        } else {
          currentDisplay(oneViewContainer, cardContainer);

          oneViewContainer.innerHTML = allSearchCards;
          cardContainer.innerHTML = "";
        }

        gallery.addEventListener("scroll", handleScroll, false);
      });
  }

  lastSearches.style.color = "#fff";
}

function handleHomeText() {
  homeText.style.color = "#5fe19b";
  lastSearches.style.color = "#fff";
  cardContainer.innerHTML = "";
  oneViewContainer.innerHTML = "";

  fetchData(+1);
}

fetchData(+1);
