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

export const displayLoading = () => {
  const loader = document.getElementById("loading");
  loader.classList.add("display");
};

export const hideLoading = () => {
  const loader = document.getElementById("loading");
  loader.classList.remove("display");
};

export const months = {
  "01": "Jua",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const platformsImg = {
  1: `<img src="../../assets/desktop/home/card/windows-icon.svg" alt="windows logo"/>`,
  2: `<img src="../../assets/desktop/home/card/ps-icon.svg" alt="playstation logo"/>`,
  3: `<img src="../../assets/desktop/home/card/xbox-icon.svg" alt="xbox logo"/>`,
  7: `<img src="../../assets/desktop/home/card/nintendo.svg" alt="nintendo logo"/>`,
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
