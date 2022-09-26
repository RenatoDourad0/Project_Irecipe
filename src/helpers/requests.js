export const fetchByIngredient = async (ingredient, pagePath) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

export const fetchByName = async (name, pagePath) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};

export const fetchByLetter = async (letter, pagePath) => {
  const URL = pagePath === '/meals'
    ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((json) => json);
  return data;
};
