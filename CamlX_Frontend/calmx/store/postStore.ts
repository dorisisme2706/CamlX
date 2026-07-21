import { create } from "zustand";

export interface Post {
  id: string;
  alias: string;
  emoji: string;
  time: string;
  content: string;
  hugs: number;
  empathy: number;
  listening: number;
  comments: number;
  images?: string[];
}

interface PostStore {
  postsByHashtag: Record<string, Post[]>;

  setInitialPosts: (data: Record<string, Post[]>) => void;

  addPost: (hashtag: string, post: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  postsByHashtag: {},

  setInitialPosts: (data) =>
    set({
      postsByHashtag: data,
    }),

  addPost: (hashtag, post) =>
    set((state) => ({
      postsByHashtag: {
        ...state.postsByHashtag,
        [hashtag]: [post, ...(state.postsByHashtag[hashtag] ?? [])],
      },
    })),
}));
