const ingredientKey = 'ingredient';

export function getIngredients() {
  try {
    const data = JSON.parse(localStorage.getItem(ingredientKey));
    return data ? data : [];
  } 
  catch (e) {
    console.error('Error parsing data from localStorage', e);
    return [];
  }
}

export function addIngredient(ingredient) {
  const ingredients = getIngredients();
  ingredients.push(ingredient);
  localStorage.setItem(ingredientKey, JSON.stringify(ingredients));
}

export function removeIngredients(removeItems) {
  const ingredients = getIngredients();
  const updatedIngredients = ingredients.filter(
    ingredient => !removeItems.includes(ingredient.id)
  );
  localStorage.setItem(ingredientKey, JSON.stringify(updatedIngredients));
}