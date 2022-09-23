export const sendToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key) => JSON.parse(localStorage.getItem(key));
