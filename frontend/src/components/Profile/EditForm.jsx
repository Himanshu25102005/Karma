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
          <div className="flex-1 relative">
            <button className="absolute right-0 cursor-pointer">
              <IconX className="text-white  h-5 md:h-8 w-5 md:w-8" />
            </button>
          </div>
        </div>

        {/* Main Form Container */}
        
      </div>
    </>
  );
};

export default EditForm;
