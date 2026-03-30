import React from 'react'
import {IconBell} from "@tabler/icons-react";

const Navbar = () => {
    return (
        <div className='border-1 border-solid border-b-white p-1 flex justify-between items-center'>

            <div className=' px-10 py-2'>
                <svg
                    className="h-11 w-11"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20 80 L45 55 H55 L80 30" stroke="#3882F6" strokeWidth="12" />
                    <path d="M20 60 L45 35 H55 L80 10" stroke="#3882F6" strokeOpacity="0.3" strokeWidth="12" />
                </svg>
            </div>
            <div className='px-14 flex gap-10'>
                <div>
                    <IconBell color="#DFDFDF" size={32} />
                </div>

                <div className="border-1 border-[#DFDFDF] rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat bg-[url('https://i.pinimg.com/736x/ae/a7/a9/aea7a9551cda1f88cc5e6e7ea52709f1.jpg')]">
                </div>

                

            </div>

        </div>
    )
}

export default Navbar