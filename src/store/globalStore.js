import { create } from 'zustand';

const globalStore = create((set) => ({
  ingredients: [
    {
      num: 0,
      name: '토마토',
      count: 1,
      expiration: '2025-05-02',
      registratioin: '2025-03-09',
      icon: './food-sample.png',
    },
    {
      num: 1,
      name: '상추',
      count: 1,
      expiration: '2025-04-28',
      registratioin: '2025-03-09',
      icon: './food-sample.png',
    },
    {
      num: 2,
      name: '배추',
      count: 1,
      expiration: '2025-05-30',
      registratioin: '2025-03-09',
      icon: './food-sample.png',
    },
  ],
}));

export default globalStore;
