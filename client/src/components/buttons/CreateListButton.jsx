/* eslint-disable react/prop-types */
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast, { Toaster } from 'react-hot-toast';
import { fetchData } from '../../actions/fetch';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

const CreateListButton = ({type, title, member, description}) => {
  const {urlBase} = useContext(UserContext);

  async function handleCreateList() {
    const toastOptions = {position: "bottom-right", duration: 2000};

    const url = urlBase+'/list/create';
    const userId = window.localStorage.getItem('id');
    const data = {
      titulo: title,
      descricao: description,
      membro: member,
      userId
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      }
  
    const result = await fetchData(url, options);
      
    if(result.status === 449) {
      toast.error('Error, the list values is empty!', toastOptions);
    }

    if(result) {
      toast.success('Success, the list is created!', toastOptions);
      window.localStorage.setItem('channelName', result.channel);
      setTimeout(() => window.location.reload(), 1000);
    }
  }
  
  return (
    <button 
      className="w-1/3 h-8 rounded text-sm flex items-center justify-center gap-1 my-4 text-center text-white font-bold"
      style={{backgroundColor:'#5AC7AA'}}
      onClick={type === 'list' && handleCreateList}
    >
      <FontAwesomeIcon icon={faCheck} />
      <span>Save</span>
      <Toaster />
    </button>
  )
}

export default CreateListButton