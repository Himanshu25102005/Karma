import React from "react";
import { IconBell } from "@tabler/icons-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-8
    bg-black/40 backdrop-blur-md border-b border-white/10">

      {/* LOGO */}
      <div className="flex items-center">
        <svg
          className="h-10 w-10"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 80 L45 55 H55 L80 30" stroke="#3882F6" strokeWidth="10" />
          <path d="M20 60 L45 35 H55 L80 10" stroke="#3882F6" strokeOpacity="0.3" strokeWidth="10" />
        </svg>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
        >
          <IconBell color="#DFDFDF" size={26} />
        </motion.div>

        {/* Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="h-10 w-10 rounded-full bg-cover bg-center border border-white/20 hover:border-white/40 transition cursor-pointer"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/ae/a7/a9/aea7a9551cda1f88cc5e6e7ea52709f1.jpg')",
          }}
        />

      </div>
    </div>
  );
};

export default Navbar;