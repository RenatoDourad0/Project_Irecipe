export const fetchByIngredient = (ingredient, pagePath) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

export const fetchByName = (name, pagePath) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const data = fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

export const fetchByLetter = (letter, pagePath) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const data = fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

export const fetchCategories = (pagePath) => {
  const URL = pagePath === '/meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const data = fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

export const fetchByCategoryName = (pagePath, categoryName) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;
  const data = fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};
