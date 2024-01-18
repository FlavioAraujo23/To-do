import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AsideViewLists from "./AsideViewLists"
import ListHomework from "./ListHomework"
import { faArrowTurnUp, faBars, faGear, faUser } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useMedia from "../hooks/useMedia"

const ListView = () => {
  const {userLogout, login} = useContext(UserContext);
  const navigate = useNavigate();
  const mobile = useMedia('(max-width: 50rem)');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if(!login) {
      navigate('/login')
    }
  }, [login, navigate]);

  const [activeListId, setActiveListId] = useState();

  const handleListClick = (listId) => {
    setActiveListId(listId);
    window.localStorage.setItem('activeList', listId);
  };

  return (
    <aside className={mobile ? "flex w-max" : "flex container"}>
      <div className={mobile ? "flex flex-col items-center gap-52" : ""}>
        {mobile &&
          <button 
            aria-label="Menu"
            className={"w-10 h-10 rounded-sm flex flex-col items-center justify-center gap-1 cursor-pointer border bg-white hover:outline-none hover:bg-slate-200 "}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <FontAwesomeIcon className="w-4 h-1 bg-black" icon={faBars}/>
            <FontAwesomeIcon className="w-4 h-1 bg-black" icon={faBars}/>
            <FontAwesomeIcon className="w-4 h-1 bg-black" icon={faBars}/>
          </button>
        }
        
        <div className={mobile ? "" : "text-gray-400 flex-col justify-between flex items-center w-10 h-screen py-4 border-r border-gray-300"}>
        {!mobile &&
          <div className="flex flex-col gap-4">
            <FontAwesomeIcon className="w-4 h-4" icon={faUser} />
            <FontAwesomeIcon className="w-4 h-4" icon={faGear} />
          </div>
        }
          <button onClick={userLogout}>
            <FontAwesomeIcon icon={faArrowTurnUp} className="rotate-[270deg] w-4 h-4"/>
          </button>

        </div>
      </div>
        <AsideViewLists handleClick={handleListClick} mobile={mobile}     mobileMenu={mobileMenu}/>
        <ListHomework mobile={mobile} />
      
    </aside>
  )
}

export default ListView