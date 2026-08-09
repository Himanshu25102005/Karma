import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const EditForm = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-[50%] w-[75%] md:w-1/2 bg-[#010211] rounded-xl p-2 flex flex-col "
      >
        {/* Header */}
        <div className="w-full shrink-0 h-12 md:h-15 flex flex-row">
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
        <form className="flex-1 min-h-0 border border-amber-100 flex flex-col md:flex-row p-1 gap-2">
          {/* Change pfp container */}
          <div className="h-[22%] w-full md:w-1/5 md:h-full border-b md:border-r border-amber-700 flex flex-col justify-center items-center gap-2 md:justify-start">
            <div className="h-full md:h-[40%] w-full flex justify-center items-center flex-col gap-1 ">
              <div className=" h-2 text-[10px] md:h-5 w-full text-white text-start md:text-sm px-2">
                Avatar
              </div>
              <div className="relative h-1/2 aspect-square border border-amber-700 rounded-full">
                <Image
                  src="https://i.pinimg.com/originals/64/06/67/6406670622da320f2ee737b8a719d01e.jpg"
                  alt="Profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <button className="h-[20%] px-2 border rounded-md border-green-900 font-semibold text-[10px] cursor-pointer text-white md:mt-2">
                Change Picture
              </button>
            </div>
          </div>
          <div className="flex-1 w-full border border-red-500"></div>
        </form>
      </motion.div>
    </>
  );
};

export default EditForm;
