
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
const DeleteTodoButton = ({mobile}) => {
  return (
    <button className={mobile ? 'hidden' : 'rounded-full w-12 h-12 border border-black flex items-center justify-center p-1'}>
      <FontAwesomeIcon icon={faTrashCan} className='w-6 h-6' />
    </button>
  )
}

export default DeleteTodoButton