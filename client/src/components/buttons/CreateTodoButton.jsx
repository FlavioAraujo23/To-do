/* eslint-disable react/prop-types */
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast, { Toaster } from 'react-hot-toast'
import { fetchData } from '../../actions/fetch';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

const CreateTodoButton = ({ title, progress, member, description }) => {
  const {urlBase} = useContext(UserContext);
  async function handleCreateTodo() {
    const listId = window.localStorage.getItem('activeList');
    const channelName = window.localStorage.getItem('channelName') || `list-${listId}-channel`;
    const toastOptions = {position: "bottom-right", duration: 2000};

      if(listId) {
        const url = urlBase+'/list/todoCreate';
        const data = {
          title,
          progress,
          member,
          description,
          listId,
          channelName
        };
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };

        const result = await fetchData(url, options);

        if(result.status === 449) {
          toast.error('Error, the todo values is empty!', toastOptions);
          return
        }

        result && toast.success('Success, the todo is created!', toastOptions)
        
      } else {
        toast.error('Error, select a list for create todo', toastOptions);
      }
      setTimeout(() => toast.remove(), 2000);
  }

  return (
    <>
      <button
        className="w-20 h-7 flex justify-center items-center rounded-md gap-2"
        style={{backgroundColor:'#5AC7AA'}}
        onClick={handleCreateTodo}
      >
        <FontAwesomeIcon className='h-3 w-3 text-white' icon={faCheck} />
        <span className="font-bold text-sm text-white pr-1">Save</span>
      </button>
      <Toaster />
    </>
  )
}

export default CreateTodoButton