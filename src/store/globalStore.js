import { create } from 'zustand';

const globalStore = create((set) => ({
  ingredients: [
    {
      id: 1,
      expiration: '2025-04-30',
      url: 'https://cdn.imweb.me/thumbnail/20230107/6f41120888517.png',
      count: 2,
    },
    {
      id: 2,
      expiration: '2025-05-04',
      url: 'https://cdn.imweb.me/thumbnail/20230107/6f41120888517.png',
      count: 1,
    },
    {
      id: 3,
      expiration: '2025-05-10',
      url: 'https://cdn.imweb.me/thumbnail/20230107/6f41120888517.png',
      count: 1,
    },
    // {
    //   name: '사과',
    //   url: 'https://cdn.imweb.me/thumbnail/20230107/6f41120888517.png',
    // },
    // {
    //   name: '바나나',
    //   url: 'https://www.pngall.com/wp-content/uploads/2016/04/Banana-Free-Download-PNG.png',
    // },
    // {
    //   name: '꼬막',
    //   url: 'https://png.pngtree.com/png-clipart/20240923/original/pngtree-food-ingredients-cockles-png-image_16070152.png',
    // },
    // {
    //   name: '당근',
    //   url: 'https://www.bobtailfruit.co.uk/media/catalog/product/cache/22f8b13a74fce530a016d5f78df80ce0/u/n/unnamed_1__2.png',
    // },
    // {
    //   name: '생선',
    //   url: 'https://png.pngtree.com/png-vector/20230919/ourmid/pngtree-fresh-nile-tilapia-or-pla-nin-in-thai-freshwater-fish-isolated-png-image_10086767.png',
    // },
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
