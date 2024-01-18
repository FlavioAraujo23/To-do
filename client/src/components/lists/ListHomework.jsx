import { useState } from "react"
import AddTodoButton from "../buttons/AddTodoButton"
import DeleteTodoButton from "../buttons/DeleteButton"
import InviteTodoButton from "../buttons/InviteTodoButton"
import InviteModalForm from "../forms/InviteModalForm"
import CreateTodoForm from "../forms/CreateTodoForm"
import ViewsTodoState from "../views/ViewsTodoState"

const ListHomework = ({ mobile }) => {
  const [modalInvite, setModalinvite] = useState();
  const [modalTodo, setModalTodo] = useState();
  const activeList = window.localStorage.getItem('activeList');

  function handleOpenModal() {
    setModalinvite(true);
  }

  function handleCloseModal() {
    setModalinvite(false);
  }

  function handleOpen() {
    setModalTodo(true);
  }

  function handleClose() {
    setModalTodo(false)
  }

  return (
    <main className={mobile ? "w-full" :"w-screen relative z-10"}>
      <header className={mobile ? 'flex items-center pt-2 w-full relative z-0 pl-5 justify-between' : "flex justify-between items-center pt-4 pl-2 "}>
        <h2 className={mobile ? 'text-sm font-bold' : "font-bold text-xl"}>Homework</h2>
        <div className={mobile ? "flex gap-2 items-center" : "flex items-center gap-2 pr-4"}>
          <div className="pr-4">
            <DeleteTodoButton mobile={mobile}/>
          </div>
          <AddTodoButton onClick={handleOpen}  mobile={mobile}/>
          <InviteTodoButton onClick={handleOpenModal}  mobile={mobile}/>
        </div>
       
      </header>
       {modalInvite && <InviteModalForm mobile={mobile} estadoModal={modalInvite} fecharModal={handleCloseModal}/>}
       {modalTodo && <CreateTodoForm mobile={mobile} estadoModal={modalTodo} fecharModal={handleClose}/>}
       {activeList && <ViewsTodoState mobile={mobile} />}
    </main>
  )
}

export default ListHomework