import React, { useState } from 'react'
import api from "@/services/api";
import useProjectStore from '@/store/useProjectStore';
import { IconSearch, IconBriefcaseFilled, IconPlus, IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useStateManager } from 'react-select';



const ProjectSelector = ({ projects, setProjects }) => {
  const setCurrentProjectId = useProjectStore((state) => state.setCurrentProjectId)

  const [form, setForm] = useState({
    name: "",
    color: "",
    description: "",
    type: "",
  });
  const [dropdown, setDropdown] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [CreateForm, setCreateForm] = useState(false);

  const setIsCurrent = async (projectId) => {

    setIsSelected(true);

    try {
      await api.updateProject(projectId, { isCurrent: true });
      setCurrentProjectId(projectId);
      console.log("Project updated in DB");
      const res = await api.getAllProjects();
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Update failed", err);
      setIsSelected(false);
    }
  };

  const showDropdown = () => {
    if (dropdown == true) setDropdown(false);
    else setDropdown(true);
  }

  const showCreateForm = () => {
    setCreateForm(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.createProject(form);
      const projectId = res.data.newProject._id;
      setCurrentProjectId(projectId);
      setIsCurrent(projectId);
      setCreateForm(false);
      setForm({
        name: "",
        color: "",
        description: "",
        type: "",
      });
    }
    catch (e) {
      console.log("Error: ", e.message)
    }
  }


  return (
    <>
      <div className=' relative  h-1/3 flex flex-col gap-1 items-center '>
        {/* Current Project */}
        <div className=' w-80 border-2 border-solid border-gray-600 rounded-2xl p-2 flex hover:bg-white/10'>
          <div className='border-r-1  border-solid w-1/4 flex justify-center items-center'>
            <IconBriefcaseFilled color="#DFDFDF" size={25} />
          </div>
          {(() => {
            const currentProject = projects.find(p => p.isCurrent === true);

            return (
              <div className='px-3 flex items-center justify-center text-2xl font-semibold text-start w-full'>
                {currentProject ? (
                  <span>{currentProject.name}</span>
                ) : (
                  <span className="text-gray-500 italic">Select a current project</span>
                )}
              </div>
            );
          })()}
          <div className='border-l-1 border-solid w-1/4 flex justify-center items-center'>
            <IconChevronDown className='cursor-target' color="#DFDFDF" onClick={showDropdown} size={25} />
          </div>
        </div>
        {/* Dropdown */}
        <div className={`${dropdown ? "flex" : "hidden"}  top-full mt-2 z-50 py-2 px-8 border-1 flex flex-col border-solid border-gray-600 h-120 w-100 rounded-xl bg-neutral-900 / bg-black/80 shadow-2xl`}>
          {/* Searchbar */}
          {/* <div className='w-full h-auto border-2 p-2 border-solid  flex gap-1 border-gray-700 rounded-md shrink-0 '>
            <div className=' flex justify-center items-center w-1/6  '>
              <IconSearch color="#DFDFDF" size={19} className='' />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              className="w-full focus:ring-1 focus:ring-white/20 p-1 text-lg bg-transparent border-l-0 border-transparent  focus:outline-none transition-all duration-200"
              placeholder="Search Projects.."
            />
          </div> */}
          {/* Project Bar */}
          {CreateForm
            ?
            <>
              <div className="w-full flex-1 overflow-y-auto scrollbar-hide my-2 px-3">

                <form onSubmit={handleSubmit} className="space-y-4 w-full">

                  {/* Form Card */}
                  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm w-full">

                    {/* Project Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-gray-300">Project Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter project name"
                        className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-white/30 focus:outline-none text-white"
                      />
                    </div>

                    {/* Type */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-gray-300">Type</label>
                      <input
                        type="text"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="e.g. Full Stack"
                        className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-white/30 focus:outline-none text-white"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-gray-300">Description</label>
                      <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Short description"
                        className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-white/30 focus:outline-none text-white"
                      />
                    </div>

                    {/* Color */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-300">Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          name="color"
                          onChange={handleChange}
                          className="w-10 h-10 p-1 rounded-lg bg-black/40 border border-white/10 cursor-target"
                        />
                        <span className="text-sm text-gray-400">Pick a project color</span>
                      </div>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all  cursor-target duration-200"
                  >
                    <IconPlus size={20} />
                    <span className="text-lg   font-semibold">Create Project</span>
                  </button>

                </form>
              </div>
            </>
            :
            <>
              <div className='w-full flex-1  overflow-y-auto scrollbar-hide my-2 scrollbar-thin border-b'>
                <div className='flex flex-col  gap-2 p-2'>
                  {/* Project */}
                  {projects.map((project) => (
                    <div key={project._id} className='p-1 flex justify-start items-center flex-row gap-2'>
                      {/* Project Colour */}
                      <div className='h-full w-1/10 flex justify-center items-center'>
                        <div
                          className='rounded-full w-5 h-5 aspect-square border'
                          style={{ backgroundColor: project.color }}
                        ></div>
                      </div>
                      {/* Project Name and Tag */}
                      <div className='w-full px-2  flex flex-col justify-center'>
                        <section className='font-bold  text-lg'>{project.name}</section>
                        <section className='font-semibold text-sm text-gray-400'>{project.type}</section>
                      </div>
                      {/* Mark as Selected */}
                      <div className='p-1 cursor-target' onClick={() => setIsCurrent(project._id)}>
                        {project.isCurrent ?
                          <IconCheck color="#DFDFDF" className='bg-white/5 rounded-md' size={25} />
                          :
                          <div className='bg-white/5 h-8 w-8 rounded-md'></div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Project Button */}
              <div className='w-full flex flex-row p-2 shrink-0 '>
                <button className='p-1 h-full '>
                  <IconPlus color="#DFDFDF" className='cursor-target' onClick={showCreateForm} size={25} />
                </button>
                <div className=' w-full flex justify-start p-1 text-xl font-semibold items-center '>
                  Create new project
                </div>
              </div>
            </>
          }
        </div>
      </div >
    </>
  )
}

export default ProjectSelector