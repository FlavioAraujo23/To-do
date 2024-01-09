/* eslint-disable react/prop-types */
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import InviteFetchButton from "../buttons/InviteFetchButton";

const InviteModalForm = ({estadoModal, fecharModal}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  return (
    <div className={estadoModal? 'mx-auto w-1/2 flex justify-end items-center absolute right-0 pt-4 pr-8' : 'hidden'}>
      <div className='max-w-md w-72 px-4 py-2 border border-gray-200'>
        <div className='flex justify-between mb-5'>
          <h2 className='font-bold text-xl text-gray-800'>Invite people</h2>
          <button onClick={fecharModal}>
            <FontAwesomeIcon icon={faX} className='text-gray-400'/>
          </button>
        </div>
        <div>
          <form className='text-gray-700' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="inEmail" className='flex flex-col pb-4'>
              <span>Email</span>
              <input 
                type="text"
                id='inEmail' 
                className='border-b border-gray-200'
                value={email}
                onChange={({target}) => setEmail(target.value)}
              />
            </label>

            <label htmlFor="inName" className='flex flex-col pb-4'>
              <span>Name</span>
              <input 
                type="text"
                id="inName"
                className='border-b border-gray-200'
                value={name}
                onChange={({target}) => setName(target.value)}
              />
            </label>
            <InviteFetchButton email={email} name={name} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default InviteModalForm