import React from 'react'

const Navbar = () => {
    return (
        <div className='border-2 border-dashed border-white p-1 flex justify-between items-center'>

            <div className='border-2 border-solid border-green-900 p-2'>
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
            <div className='border-2 border-solid border-green-900 p-2'>

            </div>

        </div>
    )
}

export default Navbar