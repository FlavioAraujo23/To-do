import { useState } from "react"
import AddTodoButton from "../buttons/AddTodoButton"
import DeleteTodoButton from "../buttons/DeleteButton"
import InviteTodoButton from "../buttons/InviteTodoButton"
import InviteModalForm from "../forms/InviteModalForm"
import CreateTodoForm from "../forms/CreateTodoForm"
import ViewsTodoState from "../views/ViewsTodoState"

const ListHomework = () => {
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
    <main className="container relative z-10">
      <header className="flex justify-between items-center pt-4 pl-4 ">
        <h2 className="font-bold text-xl">Homework</h2>
        <div className="flex items-center gap-2 pr-4">
          <div className="pr-4">
            <DeleteTodoButton />
          </div>
          <AddTodoButton onClick={handleOpen} />
          <InviteTodoButton onClick={handleOpenModal} />
        </div>
       
      </header>
       {modalInvite && <InviteModalForm estadoModal={modalInvite} fecharModal={handleCloseModal}/>}
       {modalTodo && <CreateTodoForm estadoModal={modalTodo} fecharModal={handleClose}/>}
       {activeList && <ViewsTodoState />}
    </main>
  )
}

export default ListHomework