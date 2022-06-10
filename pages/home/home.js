const input = document.getElementById("home-input");
const layer = document.getElementById("layer");
const cardContainer = document.getElementById("cards-container");
const gallery = document.getElementById("gallery");

let favorite;

gallery.addEventListener("scroll", () => {
  console.log("hola");
});

let nextPage;
let counter = 0;

input.addEventListener("focus", () => {
  layer.style.display = "block";
});

input.addEventListener("blur", () => {
  layer.style.display = "none";
});

async function fetchData() {
  const getData = await fetch(
    "https://api.rawg.io/api/games?key=3b8dd54671dc4624a07d03548d00e621"
  );
  const dataTojson = await getData.json();
  const results = dataTojson.results;
  nextPage = dataTojson.next;

  const card = (page) =>
    page.map((result) => {
      counter = counter + 1;

      let genreTitle = "";
      for (let i = 0; i < result.genres.length; i++) {
        genreTitle += `${result.genres[i].name}, `;
      }

      return ` <div class="home__main__card">
                <div class="home__main__card-img__container">
                 <img src="${result.background_image}" alt="${result.name}"/>
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
                    ${
                      result.parent_platforms[0]
                        ? `
                    <img src="../../assets/desktop/home/card/windows-icon.svg" alt="windows logo"/>`
                        : ""
                    }
                    ${
                      result.parent_platforms[1]
                        ? `
                    <img src="../../assets/desktop/home/card/ps-icon.svg" alt="plastation logo"/>`
                        : ""
                    }
                    ${
                      result.parent_platforms[2]
                        ? `
                    <img src="../../assets/desktop/home/card/xbox-icon.svg" alt="xbox logo"/>`
                        : ""
                    }
                    </div>
                  </div>
                </div>
              </div>`;
    });

  const currentCard = card(results);

  const allCards = currentCard.join(" ");

  cardContainer.innerHTML = allCards;
  favorite.addEventListener("onclick", addFavorite);
}

// function handleScroll() {
//   // cardContainer.offsetHeight + cardContainer.scrollTop >=
//   // cardContainer.scrollHeight

//   console.log("hola");
//   // async () => {
//   //   const nextPage = await fetch(dataTojson.next);
//   //   const nextCard = card(nextPage);
//   //   const allNextCards = nextCard.join("\n");

//   //   cardContainer.innerHTML = allCards + allNextCards;
//   // };
//   //}
// }

const inputEmail = document.getElementById("input-email");
const inputPsw = document.getElementById("input-psw");

const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return `Bearer ${token}`;
};

// add favorites
favorite = document.getElementById("favorite");

const myFavs = [];

const addFavorite = () => {
  if ((favorite.style.fill = "none")) {
    favorite.style.fill = "white";
  } else {
    favorite.style.fill = "none";
  }
};

fetchData();

// Logout

const logoutBtn = document.getElementById("logout-btn");

const logOut = (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.replace("../../index.html");
};

logoutBtn.addEventListener("click", logOut);
