import React, { useState } from 'react'
import { IconSearch, IconBriefcaseFilled, IconPlus, IconCheck, IconChevronDown } from "@tabler/icons-react";

const ProjectSelector = ({ projects }) => {
  const [dropdown, setDropdown] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [query, setQuery] = useState(null);

  const showDropdown = () => {
    if (dropdown == true) setDropdown(false);
    else setDropdown(true);
  }
  return (
    <>
      <div className=' relative  h-1/3 flex flex-col gap-1 items-center '>
        {/* Current Project */}
        <div className=' w-80 border-2 border-solid border-gray-600 rounded-2xl p-2 flex hover:bg-white/10'>
          <div className='border-r-1  border-solid w-1/4 flex justify-center items-center'>
            <IconBriefcaseFilled color="#DFDFDF" size={25} />
          </div>
          <div className=' px-3 flex items-center justify-center text-2xl font-semibold text-start w-full'>
            <span>DevSync</span>
          </div>
          <div className='border-l-1 border-solid w-1/4 flex justify-center items-center'>
            <IconChevronDown className='cursor-target' color="#DFDFDF" onClick={showDropdown} size={25} />
          </div>
        </div>
        {/* Dropdown */}
        <div className={`${dropdown ? "flex" : "hidden"}  top-full mt-2 z-50 py-2 px-8 border-1 flex flex-col border-solid border-gray-600 h-80 w-80 rounded-xl bg-neutral-900 / bg-black/80 shadow-2xl`}>
          {/* Searchbar */}
          <div className='w-full h-auto border-2 p-2 border-solid  flex gap-1 border-gray-700 rounded-md shrink-0 '>
            <div className=' flex justify-center items-center w-1/6  '>
              <IconSearch color="#DFDFDF" size={19} className='' />
            </div>
            <input
              type="text"
              className="w-full focus:ring-1 focus:ring-white/20 p-1 text-lg bg-transparent border-l-0 border-transparent  focus:outline-none transition-all duration-200"
              placeholder="Search Projects.."
            />
          </div>
          {/* Project Bar */}
          <div className='w-full flex-1  overflow-y-auto scrollbar-hide my-2 scrollbar-thin border-b'>
            <div className='flex flex-col  gap-2 p-2'>
              {/* Project */}
              <div className='p-1 flex justify-start items-center flex-row gap-2'>
                {/* Project Colour */}
                <div className='h-full w-1/10 flex justify-center  items-center '>
                  <div className='rounded-full w-5 aspect-square border bg-red-500'></div>
                </div>
                {/* Project Name and Tag */}
                <div className='w-full px-2  flex flex-col justify-center'>
                  <section className='font-bold  text-lg'>DevSync</section>
                  <section className='font-semibold text-sm text-gray-400'>Web App</section>
                </div>
                {/* Mark as Selected */}
                <div className='p-1 '>
                  <IconCheck color="#DFDFDF" className='bg-white/5'  size={25} />
                </div>
              </div>
            </div>
          </div>
          {/* Create Project Button */}
          <div className='w-full flex flex-row p-2 shrink-0'>
            <button className='p-1 h-full '>
              <IconPlus color="#DFDFDF" className='cursor-target ' size={25} />
            </button>
            <div className=' w-full flex justify-start p-1 text-xl font-semibold items-center '>
              Create new project
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSelector