import { create } from 'zustand';

const globalStore = create((get) => ({
  ingredientKey: 'ingredient',

  getIngredients: () => {
    return JSON.parse(localStorage.getItem(get().ingredientKey)) ?? [];
  },

  addIngredient: (ingredient) => {
    let ingredients = [];
    ingredients.push(ingredient);
    localStorage.setItem(get().ingredientKey, JSON.stringify(ingredients));

    console.log('localStorage, add', ingredients);
  },

  removeIngredients: (removeItems) => {
    let ingredients = [];
    ingredients = ingredients.filter((ingredient) => !removeItems.includes(ingredient.id));
    localStorage.setItem(get().ingredientKey, JSON.stringify(ingredients));
  
    console.log('localStorage, delete', ingredients);
  }
}));

export default globalStore;
