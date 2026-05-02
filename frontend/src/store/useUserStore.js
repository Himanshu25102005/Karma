import api from "@/services/api";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  /* State */
  userId: null,

  /* Actions */
  setCurrentUser: async () => {
    const res = await api.getCurrentUser();
    set({ userId: res.data.user._id });
  },
}));
