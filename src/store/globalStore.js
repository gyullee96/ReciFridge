import { create } from "zustand";

const globalStore = create( (set) => ({
    ingredients: {}
}))