import {create} from "zustand"

export const useProjectStore = create((set)=>({
/* State */
projectId: null,

/* Actions */
setProjectId: (id)=>{
    set({projectId: id})
}
}));