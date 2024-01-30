/* eslint-disable react/prop-types */
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateListButton from '../buttons/CreateListButton'
import { useState } from 'react'

const ModalFormCreateList = ({estadoModal, fecharModal }) => {
  const [title, setTitle] = useState('');
  const [member, setMember] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div className={estadoModal? 'mx-auto w-1/2 flex justify-center items-center absolute z-20 left-1/4 top-20 bottom-20' : 'hidden'}>
      <div className='max-w-md w-72 px-4 border border-gray-100 bg-white p-4'>
        <div className='flex justify-between mb-5'>
          <h2 className='font-bold text-xl text-gray-800'>List</h2>
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

            <label htmlFor="inMember" className='flex flex-col pb-4'>
              <span>Member</span>
              <input 
                type="text"
                id="inMember"
                className='border-b border-gray-200'
                value={member}
                onChange={({target}) => setMember(target.value)}
              />
            </label>

            <label htmlFor="inDescri" className='flex flex-col'>
              <span>Description</span>
              <input 
                type="text" 
                id="inDescri" 
                className='border-b border-gray-200'
                value={description}
                onChange={({target}) => setDescription(target.value)}
              />
            </label>
            <CreateListButton type="list" title={title} member={member} description={description} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalFormCreateList