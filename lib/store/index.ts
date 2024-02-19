import { create } from 'zustand'

type LoadingState = {
  isLoading: boolean;
}

type LoadingAction = {
  setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingState & LoadingAction>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));

type LikeState = {
  isLiked: boolean;
}

type LikeAction = {
  toggleLike: () => void;
}

const useLikedStore = create<LikeState & LikeAction>()((set) => ({
  isLiked: false,
  toggleLike: () => set((state) => ({ isLiked: !state.isLiked })),
}));

export { useLoadingStore, useLikedStore };