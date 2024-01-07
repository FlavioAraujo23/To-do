import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AsideViewLists from "./AsideViewLists"
import ListHomework from "./ListHomework"
import { faArrowTurnUp, faGear, faUser } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../context/UserContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const ListView = () => {
  const {userLogout, login} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!login) {
      navigate('/login')
    }
  }, [login, navigate]);


  return (
    <aside className="flex container">
      <div className="text-gray-400 flex flex-col justify-between items-center w-14 h-screen py-4 border-r border-gray-300">
        <div className="flex flex-col gap-4">
          <FontAwesomeIcon className="w-7 h-7" icon={faUser} />
          <FontAwesomeIcon className="w-7 h-7" icon={faGear} />
        </div>
        <button onClick={userLogout}>
          <FontAwesomeIcon icon={faArrowTurnUp} className="rotate-[270deg] w-7 h-7"/>
        </button>

      </div>
      <AsideViewLists />
      <ListHomework />
    </aside>
  )
}

export default ListView