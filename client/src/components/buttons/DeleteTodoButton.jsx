/* eslint-disable react/prop-types */

import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchData } from '../../actions/fetch';

const DeleteTodoButton = ({ todoId , channelName}) => {
  async function handleDeleteTodo() {
    const url = 'http://localhost:3000/list/deleteTodo';
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