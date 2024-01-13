/* eslint-disable react/prop-types */
import { faNoteSticky, faRocket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { fetchData } from '../../actions/fetch'
import { pusher } from '../../actions/pusher'

const TodoViews = ({ state }) => {
  const [todos, setTodos] = useState([]);
  const [todosIds, setTodosIds] = useState();
  const borderColor = state === 'Todo' ? '#000' : state === 'Doing' ? '#efeba9' : '#5ac7aa'
  const listIsActive = window.localStorage.getItem('activeList');

  useEffect(() => {
    const listId = window.localStorage.getItem('activeList');
  
    async function getTodos() {
      const url = 'http://localhost:3000/list/getTodo';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, state }),
      };
      const result = await fetchData(url, options);
      if (result) {
        setTodos(result);
        const filteredIds = result
          .filter((todo) => todo.id !== null)
          .map((todo) => todo.id);
        setTodosIds(filteredIds);
      }
    }
  
    if (listId) {
      getTodos();
    }
  }, [listIsActive, state]);
  
  useEffect(() => {
    if (todosIds !== undefined && todosIds.length > 0) {
      const handleTodoFromPusher = (data) => {
        const idAlreadyExists = todosIds.includes(data.content.id);
        if (data.content.progresso === state && !idAlreadyExists) {
          setTodos((prevTodos) => [...prevTodos, data.content]);
        }
      };
  
      const listId = window.localStorage.getItem('activeList');
      const channelName = listId ? window.localStorage.getItem('channelName') || `list-${listId}-channel` : null;
  
      if (channelName) {
        const channel = pusher.subscribe(channelName);
        channel.bind('TODO-CREATED', handleTodoFromPusher);
      }
    }
  }, [state, todosIds]);
    
  return (
    <>
      {todos && listIsActive && todos.map(todo => (
        <div key={todo.id} className="flex flex-col p-2 rounded-lg bg-orange-100/20" style={{ border: `4px dashed ${borderColor}`}}>
          <div className="flex items-center gap-2 ">
            <FontAwesomeIcon className='w-3 h-3' icon={faNoteSticky} />
            <h2 className='min-w-32 max-w-32 overflow-hidden font-bold text-sm'>{todo.titulo}</h2>
            <label className='border border-gray-200 rounded-md p-1'>
              <FontAwesomeIcon className='w-3 h-3' icon={faRocket}/>
              <select className='focus:outline-none w-16 text-sm' defaultValue={todo.progresso}>
                <option value="Todo">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </div>
          <div className='flex items-center gap-4 pt-2'>
            <p className='text-xs w-36 h-9 overflow-hidden'>{todo.descricao}</p>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon className='w-3 h-3' icon={faUser} />
              <p>{todo.membro}</p>
            </div>
          </div>
        </div>
        
      ))}
    </>   
  )
}

export default TodoViews