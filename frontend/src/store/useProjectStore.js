import { create } from "zustand";

export const useProjectStore = create((set, get) => ({
  /* State */
  projectId: null,
  currentProjectId: null,

  /* Actions */
  setCurrentProjectId: (projectId) => {
    // console.log("Setting ID:", projectId);
    set({ currentProjectId: projectId });
  },
  setProjectId: (id) => {
    set({ projectId: id });
  },

  print: () => {
    console.log("Current Project Id is: ", get().currentProjectId);
  },
}));

export default useProjectStore;