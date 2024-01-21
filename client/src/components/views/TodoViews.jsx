/* eslint-disable react/prop-types */
import { faNoteSticky, faRocket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../actions/fetch'
import { pusher } from '../../actions/pusher'
import DeleteTodoButton from '../buttons/DeleteTodoButton'
import { UserContext } from '../../context/UserContext'

const TodoViews = ({ state }) => {
  const {urlBase} = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const borderColor = state === 'Todo' ? '#000' : state === 'Doing' ? '#efeba9' : '#5ac7aa';
  const listIsActive = window.localStorage.getItem('activeList');
  const [update, setUpdate] = useState(null);
  const [channelName, setChannelName] = useState(() => {
    const listId = window.localStorage.getItem('activeList');
    const storedChannelName = window.localStorage.getItem('channelName');
    const newChannelName = `list-${listId}-channel`;

    if (!storedChannelName) {
      window.localStorage.setItem('channelName', newChannelName);
    }

    return storedChannelName || newChannelName;
  });
  const channel = pusher.subscribe(channelName);

  useEffect(() => {
    const listId = window.localStorage.getItem('activeList');
    setChannelName(() => {
      window.localStorage.setItem('channelName', `list-${listId}-channel`)
      return `list-${listId}-channel`
    });
    
    async function getTodos() {
      const url = urlBase+'/list/getTodo';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listId, state }),
      };
      const result = await fetchData(url, options);
      if (result) {
         setTodos(result);
      }
    }

    if (listId) {
      getTodos();
    }
  }, [listIsActive, state, update]);


  useEffect(() => {
      const updateTodo = ({ content }) => {
        if (content.progresso === state) {
          setTodos((prevTodos) => [...prevTodos, content]);
        }
      }

        channel.bind('TODO-CREATED',updateTodo);
        return () => {
          channel.unbind('TODO-CREATED', updateTodo);
        }
  }, []);

  useEffect(() => {
    const handleUpdateTodo = (data) => {
      const removeTodoById = (todos, id) => {
        return todos.filter((todo) => todo.id !== id);
      };

      setTodos((prevTodos) => removeTodoById(prevTodos, data.deletedTaskId))
    }

    channel.bind('TODO-DELETED', handleUpdateTodo);
    return () => {
      channel.unbind('TODO-DELETED', handleUpdateTodo);
    };
  }, []);

  const updateTodo = async (event, idTodo) => {
    const progress = event.target?.value;
    if(progress !== null) {
      const url = urlBase+'/list/updateTodo';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({progress, idTodo, channelName}),
      };
      await fetchData(url, options);
      return;
    }
  }

  useEffect(() => {
    function eventUpdateTodo({ content }) {
      setTodos((prevTodos) => {
        const existingIndex = prevTodos.findIndex((todo) => todo.id === content.id);
        if (existingIndex !== -1) {
          const updatedTodos = [...prevTodos];
          updatedTodos[existingIndex] = content;
          if (state === content.progresso) {
            return updatedTodos;
          } else {
            return prevTodos;
          }
        } else {
          return state === content.progresso ? [...prevTodos, content] : prevTodos;
        }
      });
      setUpdate(true)
    }

    channel.bind('TODO-UPDATED',eventUpdateTodo);
    return () => {
      channel.unbind('TODO-UPDATED', eventUpdateTodo);
    }
  }, []);


  return (
    <>
      {todos && listIsActive && todos.map(todo => (
        <div key={todo.id} className="flex flex-col p-2 rounded-lg bg-orange-100/20" style={{ border: `4px dashed ${borderColor}`}}>
          <div className="flex justify-between items-center gap-2 ">
            <FontAwesomeIcon className='w-3 h-3' icon={faNoteSticky} />
            <h2 className='min-w-32 max-w-32 overflow-hidden font-bold text-sm'>{todo.titulo}</h2>
            <label className='border border-gray-200 rounded-md p-1'>
              <FontAwesomeIcon className='w-3 h-3' icon={faRocket}/>
              <select className='focus:outline-none w-16 text-sm' value={todo.progresso} onChange={(e) => updateTodo(e, todo.id)}>
                <option value="Todo">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </label>
            <div className='pb-8'>
              <DeleteTodoButton todoId={todo.id} channelName={window.localStorage.getItem('channelName')} />
            </div>
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