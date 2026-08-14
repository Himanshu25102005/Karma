import api from "@/services/api";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  /* State */
  userId: null,
  username: null,
  profilePicture: null,
  email: null,
  about: null,
  avatar: null,

  /* Actions */
  setCurrentUser: async () => {
    try {
      const res = await api.getCurrentUser();

      console.log("API avatar:", res.data.user.avatar);
      set({
        userId: res.data.user._id,
        username: res.data.user.username,
        profilePicture: res.data.user.profilePicture,
        email: res.data.user.email,
        about: res.data.user.about,
        avatar: res.data.user.avatar,
      });
    } catch (e) {
      console.log("Failed to fetch user:", e);
    }
  },
}));

export default useUserStore;
