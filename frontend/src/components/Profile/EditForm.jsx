import { IconX } from "@tabler/icons-react";
import React from "react";

const EditForm = () => {
  return (
    <>
      <div className="h-[50%] w-[75%] md:w-1/2 bg-[#010211] rounded-xl p-2">
        {/* Header */}
        <div className="w-full h-12 md:h-15 flex flex-row">
          <div className="w-[75%] border h-full flex flex-col">
            <span className="font-semibold text-lg md:text-2xl text-neutral-300">
              Edit Profile
            </span>
            <span className="text-[9px] md:text-lg text-neutral-500">
              Update your personal information and Links
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="shrink-0 border-t border-neutral-800 bg-[#0a0a0a] px-4 py-4 lg:bg-[#0c0c0f] lg:px-6 lg:py-4">
          <div className="flex gap-3 lg:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900/80 px-4 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-800 lg:flex-none lg:px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500 lg:flex-none lg:px-6"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Form Container */}
        
      </div>
    </>
  );
};

export default EditForm;
