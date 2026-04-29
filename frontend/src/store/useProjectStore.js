import { create } from "zustand";

export const useProjectStore = create((set) => ({
  /* State */
  projectId: null,
  currentProjectId: null,

  /* Actions */
  setCurrentProjectId: (projectId) => {
    console.log("Setting ID:", projectId);
    set({ currentProjectId: projectId });
  },
  setProjectId: (id) => {
    set({ projectId: id });
  },
}));

export default useProjectStore;
