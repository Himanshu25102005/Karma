import api from "@/services/api";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  /* State */
  userId: null,
  username: null,

  /* Actions */
  setCurrentUser: async () => {
    try {
      const res = await api.getCurrentUser();

      set({
        userId: res.data.user._id,
        username: res.data.user.username,
      });

      console.log("User name", res.data.user.username);
    } catch (e) {
      console.log("Failed to fetch user:", e);
    }
  },
}));

export default useUserStore;
