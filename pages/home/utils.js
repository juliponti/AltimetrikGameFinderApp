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

export const currentDisplay = (active, hidden) => {
  active.style.display = "grid";
  hidden.style.display = "none";
};
