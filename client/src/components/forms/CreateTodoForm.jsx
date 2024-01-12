/* eslint-disable react/prop-types */
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import CreateTodoButton from "../buttons/CreateTodoButton";

const CreateTodoForm = ({estadoModal, fecharModal}) => {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('Todo');
  const [member, setMember] = useState('');
  const [description, setDescription] = useState('');
  
  return (
    <div className={estadoModal? 'mx-auto w-1/2 flex justify-end items-center absolute right-0 pt-4 pr-8 z-20' : 'hidden'}>
    <div className='max-w-md w-72 px-4 py-2 border border-gray-200 bg-white'>
      <div className='flex justify-between mb-5'>
        <h2 className='font-bold text-xl text-gray-800'>To do</h2>
        <button onClick={fecharModal}>
          <FontAwesomeIcon icon={faX} className='text-gray-400'/>
        </button>
      </div>
      <div>
        <form className='text-gray-700' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="inTitle" className='flex flex-col pb-4'>
            <span>Title</span>
            <input 
              type="text"
              id='inTitle' 
              className='border-b border-gray-200'
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />
          </label>

          <label htmlFor="seProgress" className='flex flex-col pb-4'>
            <span>Progress</span>
            <select 
              value={progress}
              id="seProgress"
              className="border-b border-emerald-400" 
              onChange={({target}) => setProgress(target.value)}
            >
              <option value="Todo">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label htmlFor="inMember" className="flex flex-col pb-4">
            <span>Member</span>
            <input 
              type="text"
              id="inMember"
              className="border-b border-gray-200"
              value={member}
              onChange={({target}) => setMember(target.value)}
            />
          </label>
          <label htmlFor="inDesc" className="flex flex-col pb-4">
            <span>Description</span>
            <input 
              type="text"
              id="inDesc"
              className="border-b border-gray-200"
              value={description}
              onChange={({target}) => setDescription(target.value)}
            />
          </label>
          <CreateTodoButton title={title} progress={progress} member={member} description={description} />
        </form>
      </div>
    </div>
  </div>
  )
}

export default CreateTodoForm