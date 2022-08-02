import { snackbar } from "../../utils.js";

export const debounce = (fn, wait) => {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
};

export const img = (url) => {
  const iconUrl = url;
  return `<img src="${iconUrl}" alt="" />`;
};

export const optionButton = (options) =>
  options.map((result) => {
    return `
  <button class="options" value="${result.name}">${result.name}</button>
  `;
  });

export const displayLoader = () => {
  const loader = document.getElementById("loading");
  loader.classList.add("display");
};

export const hideLoader = () => {
  const loader = document.getElementById("loading");
  loader.classList.remove("display");
};

export const getElementById = (id) => {
  const element = document.getElementById(`${id}`);
  return element;
};

export const cardsDisplay = (hiddenP, activeP, hiddenC, activeC) => {
  const cardContainer = document.getElementById("cards-container");

  cardContainer.classList.contains(hiddenP) &&
    cardContainer.classList.remove(hiddenP);
  !cardContainer.classList.contains(activeP) &&
    cardContainer.classList.add(activeP);

  const children = [...cardContainer.children];
  children.map(
    (el) => el.classList.contains(hiddenC) && el.classList.remove(hiddenC)
  );

  children.map(
    (el) => !el.classList.contains(activeC) && el.classList.add(activeC)
  );
};

export async function getGames(url) {
  try {
    const getData = await fetch(url);
    const dataToJson = await getData.json();

    if (!getData.ok) {
      const message = await getData.json();
      snackbar(message);
    }

    return dataToJson;
  } catch (err) {
    snackbar("An error has occurred");
  }
}

export const organizeInfo = (parent) => {
  let newParent = "";
  parent.forEach((child) => {
    newParent += `${child.name}, `;
  });

  return newParent;
};

export const organizePlataforms = (parentPlatform, newParent, platformsImg) => {
  parentPlatform.forEach((platform) => {
    const id = platform.platform.id;
    newParent.push(platformsImg[id]);
  });
};

export const formatDate = (date, months) => {
  const newDate = date?.split("-");
  if (newDate) {
    const month = newDate[1];
    const currentMonth = months[month];
    return `${currentMonth} ${newDate[2]}, ${newDate[0]}`;
  }
};

export const handleViewDisplay = (view, fn) => {
  if (view) {
    fn(
      "one-card-view__card__container",
      "home__card__container",
      "one-card-view__card",
      "home__main__card"
    );
  } else {
    fn(
      "home__card__container",
      "one-card-view__card__container",
      "home__main__card",
      "one-card-view__card"
    );
  }
};

export function addEventListenerToManyEls(classname, event, fn) {
  const element = document.getElementsByClassName(classname);
  Array.from(element).forEach((item) => item.addEventListener(event, fn));
}

export const getTrailer = (gameId, apiKey) => {
  const trailers = fetch(
    `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}&`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) {
        throw data;
      }

      const clips = data.results;

      return clips;
    })
    .catch((err) => {
      snackbar(err);
    });

  return trailers;
};

export const getAllGameData = (gameData, apiKey) => {
  let completeGameData;
  const promises = [];

  gameData.forEach((game) => {
    const gameId = game.id;

    const gameFetch = fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${apiKey}&`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          throw data;
        }

        completeGameData = Object.assign(game, data);

        return completeGameData;
      })
      .catch((err) => {
        snackbar(err);
      });

    promises.push(gameFetch);
  });

  return Promise.all(promises);
};

export const activeObserver = (lastCardOnScreen, observer) => {
  const cardsOnScreen = document.querySelectorAll(
    ".cards-container  .home__main__card"
  );

  lastCardOnScreen = cardsOnScreen[cardsOnScreen.length - 1];
  if (lastCardOnScreen) {
    observer.observe(lastCardOnScreen);
  }
};

export function trapFocus(element, state) {
  const source = document.querySelector("source");
  const aEl = document.querySelector("a");

  const focusableEls = element.querySelectorAll(
    `${
      aEl && aEl.href !== "javascript:void(0);" && "a[href]:not([disabled])"
    }, button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), ${
      source?.dataset.video === "true" && "video:not([disabled])"
    }`
  );

  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;

  firstFocusableEl.focus();

  function handleTrapFocus(e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  }

  if (state) {
    return element.addEventListener("keydown", handleTrapFocus);
  } else {
    return element.removeEventListener("keydown", handleTrapFocus);
  }
}
