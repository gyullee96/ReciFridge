import { create } from 'zustand';

const globalStore = create((set) => ({
  ingredients: [
    {
      id: 0,
      name: '토마토',
      count: 1,
      expiration: '2025-05-02',
      icon: './food-sample.png',
    },
    {
      id: 1,
      name: '상추',
      count: 1,
      expiration: '2025-04-28',
      icon: './food-sample.png',
    },
    {
      id: 2,
      name: '배추',
      count: 1,
      expiration: '2025-05-30',
      icon: './food-sample.png',
    },
  ],
  removeIngredient: (idsToRemove) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (item) => !idsToRemove.includes(item.id),
      ),
    })),
}));

export default globalStore;
