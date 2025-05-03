import { create } from 'zustand';

<<<<<<< HEAD
const globalStore = create((set) => ({
  ingredients: [
    {
      id: 1,
      expiration: '2025-04-30',
      count: 2,
    },
    {
      id: 2,
      expiration: '2025-05-04',
      count: 1,
    },
    {
      id: 3,
      expiration: '2025-05-10',
      count: 1,
    },
  ],

  addIngredients: (value) =>
    set((state) => ({ ingredients: [...state.ingredients, value] })),

  removeIngredient: (idsToRemove) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (item) => !idsToRemove.includes(item.id),
      ),
    })),
=======
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
>>>>>>> develop
}));

export default globalStore;
