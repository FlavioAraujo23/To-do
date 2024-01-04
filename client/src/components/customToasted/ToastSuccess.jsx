import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast';
const ToastSuccess = () => {
  return (
    <div className='flex gap-40 items-center bg-lime-300/40 max-w-max h-12 px-4 rounded'>
      <div className='flex items-center gap-4'>
        <FontAwesomeIcon className='text-green-400 w-4 h-4' icon={faCircleCheck} />
        <span className='text-green-800'>Login successfully</span>
      </div>
      <div className='flex items-center gap-4'>
        <span 
          className='border border-green-400 py-1 px-2 text-green-800 rounded'
        >
          redirecting...
        </span>
        <button 
          onClick={() => toast.remove()}
        >
          <FontAwesomeIcon 
            className='text-green-400 w-4 h-4 cursor-pointer hover:text-green-300'
            icon={faXmark} 
          />
        </button>
      </div>
    </div>
  )
}

export default ToastSuccess