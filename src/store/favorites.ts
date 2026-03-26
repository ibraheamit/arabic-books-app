import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '../features/books/types';

interface FavoritesState {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (book) => set((state) => ({ favorites: [...state.favorites, book] })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((b) => b.id !== id),
      })),
      isFavorite: (id) => get().favorites.some((b) => b.id === id),
    }),
    {
      name: 'books-favorites-storage',
    }
  )
);
