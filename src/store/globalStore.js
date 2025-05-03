import { create } from 'zustand';

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
}));

export default globalStore;
