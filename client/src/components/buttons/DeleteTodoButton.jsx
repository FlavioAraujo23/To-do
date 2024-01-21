/* eslint-disable react/prop-types */

import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchData } from '../../actions/fetch';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

const DeleteTodoButton = ({ todoId , channelName}) => {
  const {urlBase} = useContext(UserContext);
  async function handleDeleteTodo() {
    const url = urlBase+'/list/deleteTodo';
    const data = {todoId, channelName}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const result = await fetchData(url, options);
    return result;
  }
  return (
    <button onClick={handleDeleteTodo}>
      <FontAwesomeIcon icon={faX} className='w-3 h-3' />
    </button>
  )
}

export default DeleteTodoButton