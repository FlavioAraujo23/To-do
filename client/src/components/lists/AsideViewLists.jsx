/* eslint-disable react/prop-types */
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { fetchData } from "../../actions/fetch";
import { UserContext } from "../../context/UserContext";
import ModalFormCreateList from "../forms/ModalFormCreateList";


const AsideViewLists = ({ handleClick }) => {
  const [userLists, setUserList] = useState(null);
  const [activeListId, setActiveListId] = useState(() => {
    const idList = window.localStorage.getItem('activeList');
    return !idList ? null : +idList 
  } );
  const {login} = useContext(UserContext);
  const [modal,setModal] = useState();
  const defaultStyles = 'text-left max-w-max py-2 px-4 hover:bg-gray-200/50'
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    async function getListsById() {
      const idList = window.localStorage.getItem('activeList');
      if(!idList) {
        window.localStorage.removeItem('activeList');
      }
      const url = 'http://localhost:3000/list/getList';
      if(window.localStorage.getItem('id') && login ){
      const userId = window.localStorage.getItem('id');
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId}),
        }

      const listsFromUser = await fetchData(url, options);
      if(listsFromUser) {
        setUserList(listsFromUser.userListData);
        setDataLoaded(true);
      }
    }
  }
    getListsById();
  }, []);

  const handleListClick = (listId) => {
    handleClick(listId);
    setActiveListId(listId);
    window.localStorage.setItem('activeList', listId)
  };

  const fecharModal = () => {
    setModal(false);
  };

  return (
    <>
      <aside className="container w-52 h-screen py-2 overflow-hidden border border-r border-gray-400">
          <div className="flex justify-between px-2 pb-1 items-center border-b border-gray-400">
            <h2 className="text-3xl font-bold text-gray-400/70">Lists</h2>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-md" 
              style={{backgroundColor:'#5AC7AA'}}
              onClick={() => setModal(true)}
            >
              <FontAwesomeIcon className="text-white w-5 h-5" icon={faPlus} />
            </button>
          </div>
          <div>
            {dataLoaded && userLists && userLists.map(list => (
              <button 
                key={list.id}
                onClick={() => handleListClick(list.id)}
                
                className={list.id !== activeListId ? defaultStyles : defaultStyles+' bg-gray-200 transition-all border-r-4 border-emerald-400'}
                >
                <h2 className="font-bold text-sm text-gray-700">{list.titulo}</h2>
                <p className="text-xs text-gray-400">{list.descricao}</p>
              </button>
            ))}
          </div>
      </aside>
     {modal && <ModalFormCreateList estadoModal={modal} fecharModal={fecharModal}/>}
    </>
  )
}

export default AsideViewLists