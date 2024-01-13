/* eslint-disable react/prop-types */
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import validateFormInputs from '../../actions/validateInputs'
import toast, { Toaster } from 'react-hot-toast';
import { fetchData } from '../../actions/fetch';

const CreateButton = ({type, title, member, description}) => {

  async function handleCreateList() {
    const validate = validateFormInputs(title, member, description);
    const toastOptions = {position: "bottom-right", duration: 2000};

    if(validate) {
      const url = 'http://localhost:3000/list/create';
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
      if(result) {
        toast.success('Success, the list is created!', toastOptions);
        window.localStorage.setItem('channelName', result.channel);
        setTimeout(() => window.location.reload(), 1000);
        
      }
    } else {
      toast.error('Error, the list values is empty!', toastOptions);
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

export default CreateButton