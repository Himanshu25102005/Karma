import { create } from 'zustand';

const useRefreshStore = create((set) => ({
  refreshToggle: false,
  
  // Call this function anywhere to alert listening components
  triggerRefresh: () => set((state) => ({ refreshToggle: !state.refreshToggle })),
}));

export default useRefreshStore;