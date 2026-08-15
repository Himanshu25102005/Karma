import api from "@/services/api";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  /* State */
  userId: null,
  name: null,
  username: null,
  profilePicture: null,
  email: null,
  about: null,
  avatar: null,
  github: null,
  bio: null,
  website: null,
  isPublic: null,
  links: [],
  createdAt: null,

  /* Actions */
  setCurrentUser: async () => {
    try {
      const res = await api.getCurrentUser();

      console.log("API avatar:", res.data.user.avatar);
      set({
        userId: res.data.user._id,
        name: res.data.user.name,
        username: res.data.user.username,
        profilePicture: res.data.user.profilePicture,
        email: res.data.user.email,
        about: res.data.user.about,
        avatar: res.data.user.avatar,
        github: res.data.user.github,
        bio: res.data.user.bio,
        website: res.data.user.website,
        isPublic: res.data.user.isPublic,
        links: res.data.user.links || [],
        createdAt: res.data.user.createdAt,
      });
    } catch (e) {
      console.log("Failed to fetch user:", e);
    }
  },
}));

export default useUserStore;
